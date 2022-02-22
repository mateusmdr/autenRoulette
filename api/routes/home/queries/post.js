import {db, pgp} from '../../../utils/db.js';
import fetch from 'node-fetch';

export const registerUser = async({name, phone}) => {
    const query = await db.oneOrNone('SELECT id FROM users WHERE (NAME=$1 AND PHONE=$2)',[name, phone]);
    if(!!query) return query.id;

    const cs = new pgp.helpers.ColumnSet(
        ['name', 'phone'],
        {table: 'users'}
    );

    const {id} = await db.one(pgp.helpers.insert({
        name,
        phone
    },cs) + 'RETURNING id');

    return id;
};

import {getProbability} from '../../admin/queries/get';

export const generateDrawnOption = async({userId, ipAddress}) => {
    let query;

    const {exists} = await db.one('SELECT (COUNT(*)>0) AS exists FROM users WHERE (id=$1)',userId);
    if(!exists) return({error: 'userNotFound', msg: 'ID de usuário não encontrado.'})

    //verify that user hasn't tried to win a prize in the past 24h
    query = await db.one("SELECT (COUNT(*)>0) AS hassessiontoday from sessions WHERE (user_id=$1 AND spinresulttype!='retry' AND (DATE_PART('day',NOW() - spindatetime)<1))",userId);
    const hasSessionToday = query.hassessiontoday;
    if(hasSessionToday){
        //return({error: 'hasSessionToday', msg: 'Já registramos uma tentativa nas últimas 24h.'});
    }

    //verify that the same IP hasn't requested more than once in the past 12h
    query = await db.one("SELECT (COUNT(*)>=1) AS requestlimitreached FROM attempts WHERE ((ipaddress=$1) AND (DATE_PART('day',NOW() - attemptdatetime)*24 + DATE_PART('hour',NOW() - attemptdatetime)) <= 12)", ipAddress)
    const requestLimitReached = query.requestlimitreached;
    if(requestLimitReached) {
        //return({error: 'requestLimitReached', msg: 'Muitas tentativas registradas, tente novamente mais tarde.'});
    }
    
    //draw an option from availablePrizes
    query = await db.any("SELECT * FROM availablePrizes WHERE (resulttype!='success' OR drawNumber<maxDraws)");
    const options = await Promise.all(query.map((item, index) => {
        return {
            id: item.id,
            position: index + 1,
            resultType: item.resulttype,
            amount: Number(item.amount),
            maxDraws: Number(item.maxdraws),
            resetPeriod: item.resetperiod,
            drawNumber: Number(item.drawnumber)
        };
    }));

    //Calculate BaseChance
    const generalProbability = await getProbability();

    const retryAmount = (await db.one("SELECT COUNT(*) FROM availablePrizes WHERE (resulttype='retry')")).count;
    const prizeAmount = (await db.one("SELECT COUNT(*) FROM availablePrizes WHERE (resulttype='success' AND drawNumber<maxDraws)")).count;
    const optionAmount =  (await db.one("SELECT COUNT(*) FROM availablePrizes WHERE (resulttype!='success' OR drawNumber<maxDraws)")).count;

    const baseChance = (optionAmount * generalProbability) / (prizeAmount + generalProbability * retryAmount)
    let drawnOption;

    if(Math.random() > baseChance) {
        const failureOptions = options.filter(option => option.resultType === 'fail');
        if(failureOptions.length === 0){
            drawnOption = (options.sort(() => Math.random() > .5 ? 1 : -1)[0]);
        }else {
            drawnOption = failureOptions.sort(() => Math.random() > .5 ? 1 : -1)[0];
        }
    }else {
        drawnOption = options[Math.floor(Math.random()*options.length)];
    }

    //register attempt if it wasn't retry
    if(drawnOption.resultType !== 'retry'){
        await db.query('INSERT INTO attempts (ipaddress, attemptdatetime) VALUES ($1,NOW())',ipAddress);
    }

    //increment option drawNumber if it was successful
    if(drawnOption.resultType === 'success'){
        await db.none('UPDATE availablePrizes SET drawnumber=$1 WHERE id=$2',[drawnOption.drawNumber + 1, drawnOption.id]);
    }
    
    //generate session
    let values = drawnOption.resultType === 'success' ? 
        [drawnOption.resultType, drawnOption.amount, userId] :
        [drawnOption.resultType, null, userId];
    
    await db.none('INSERT INTO sessions (spindatetime, spinresulttype, spinresultamount, user_id) VALUES (NOW(),$1,$2,$3)', values);
    let drawnPrizeId;
    //include prize in drawnPrizes
    if(values[0] === 'success'){
        const cs = new pgp.helpers.ColumnSet(
            ['amount', 'windatetime', 'ispending', 'user_id']
        );

        const sql = pgp.helpers.insert({
            amount: drawnOption.amount,
            windatetime: new Date().toISOString(),
            ispending: true,
            user_id: userId
        },cs, 'drawnprizes') + ' RETURNING id';

        drawnPrizeId = (await db.one(sql)).id;
    }

    //notify user of the result
    return({
        id: drawnOption.id,
        resultType: drawnOption.resultType,
        amount: drawnOption.resultType === 'success' ? drawnOption.amount : undefined,
        drawnPrizeId: drawnPrizeId
    });
}

const drawTwo = (arr) => {
    const drawnSet = new Set();

    if(arr.length > 2) {
        while(drawnSet.size !== 2) {
            const randIndex = Math.floor(Math.random() * arr.length);
            drawnSet.add(arr[randIndex]);
        }
        return([...drawnSet]);
    }
    
    if(arr.length < 2) {
        return(new Array(2).fill(arr[0]));
    }
    
    return (arr);
}

const geocode = async (coords) => {
    const params = new URLSearchParams({
        latlng: `${coords.lat},${coords.lng}`,
        key: process.env.GEOCODING_API_KEY,
        result_type: 'administrative_area_level_2',
        language: 'pt-BR',
    });
    const url = `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`;
    const res = await fetch(url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    const json = await res.json();
    const result = json.results[0];
    return({
        state: result.address_components
            .filter(comp => comp.types.includes("administrative_area_level_1"))
            .map(comp => {return{
                nome: comp.long_name,
                sigla: comp.short_name
            }})[0],
        city: result.address_components
            .filter(comp => comp.types.includes("administrative_area_level_2"))
            .map(comp => {return{
                nome: comp.long_name
            }})[0],
    });
}

export const generateAds = async({coords}) => {
    let query = await db.any('SELECT companyname, imgfilename, linkurl, locationfilter from ads WHERE ((initialdatetime < NOW()) AND (NOW() < expirationdatetime))');

    const ads = (query.map(ad => {
        const locationFilter = JSON.parse(ad.locationfilter);
        return({
            companyName: ad.companyname,
            imgPath: `${process.env.API_ADDRESS}/assets/${ad.imgfilename}`,
            linkURL: ad.linkurl,
            locationFilter: (
                locationFilter.states.map(state => {
                    const cities = locationFilter.cities
                        .filter(city => (city.UF.id === state.id))
                        .map(city => city.nome);
                    return{
                        nome: state.nome,
                        sigla: state.sigla,
                        cities: cities
                    }
                })
            )
        })
    }));

    // Filter ads that correspond with client coords
    if(!!coords){ // Check if coords are not null
        const validAds = (await Promise.all(ads.map(async (ad) => {
            if(ad.locationFilter.length===0) return true; // Don't check if there are no filters
            const filter =  await geocode(coords).then(location => {
                const stateFilter = ad.locationFilter.filter(state => state.sigla === location.state.sigla);
                if(stateFilter.length === 0) return false; // State not listed in filters

                if(stateFilter[0].cities.length === 0) return true; // Don't check if there are no cities listed

                const cityFilter = stateFilter[0].cities.includes(location.city.nome);
                return(cityFilter); // Allow if city is listed
            }).catch(e => {
                console.error('Problem with gapi request: ' + e.message);
                return true;
            });
            return {
                filter,
                ...ad
            };
        })))
        .filter(ad => ad.filter) // Filter after data was mapped
        .map(ad => {return{...ad, filter:undefined}});
        if(validAds.length > 0)
            return drawTwo(validAds);
    }
    if(ads.length > 0)
        return drawTwo(ads);
    
    query = await db.any('SELECT companyname, imgfilename, linkurl, locationfilter from ads');
    const expiredAds = (query.map(ad => {
        return({
            companyName: ad.companyname,
            imgFileName: ad.imgfilename,
            linkURL: ad.linkurl,
            locationFilter: ad.locationfilter
        })
    }));

    if(expiredAds.length > 0)
        return drawTwo(expiredAds);
    
    return({error: 'NO_ADS_REGISTERED', msg: 'Nenhum anúncio registrado.'});
}
import {db, pgp} from '../../../utils/db.js';

export const getAvailablePrizes = async() => {
    const prizes = await db.many('SELECT id, resulttype, amount FROM availableprizes');

    return prizes.map((prize, index) => {
        return ({
            position: index + 1,
            resultType: prize.resulttype,
            amount: prize.resulttype==='success' ? Number(prize.amount) : undefined,
        });
    })
};

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

export const getAds = async({location}) => {
    let query = await db.any('SELECT companyname, imgfilename, linkurl, locationfilter from ads WHERE ((initialdatetime < NOW()) AND (NOW() < expirationdatetime))');

    const ads = (query.map(ad => {
        return({
            companyName: ad.companyname,
            imgFileName: ad.imgfilename,
            linkURL: ad.linkurl,
            locationFilter: ad.locationfilter
        })
    }));

    const validAds = ads.filter(ad => true); // TO-DO logic for locationFilter
    console.log(validAds);
    
    if(validAds.length > 0)
        return drawTwo(validAds);

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
import {db, pgp} from '../../../utils/db.js';

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

export const generateDrawnOption = async({userId, ipAddress}) => {
    let query;

    const {exists} = await db.one('SELECT (COUNT(*)>0) AS exists FROM users WHERE (id=$1)',userId);
    if(!exists) return({error: 'userNotFound', msg: 'ID de usuário não encontrado.'})

    //verify that user hasn't tried to win a prize in the past 24h
    query = await db.one("SELECT (COUNT(*)>0) AS hassessiontoday from sessions WHERE (user_id=$1 AND spinresulttype!='retry' AND (DATE_PART('day',NOW() - spindatetime)<1))",userId);
    const hasSessionToday = query.hassessiontoday;
    if(hasSessionToday){
        return({error: 'hasSessionToday', msg: 'Já registramos uma tentativa nas últimas 24h.'});
    }

    //verify that the same IP hasn't requested too many times in the last hour
    query = await db.one("SELECT (COUNT(*)>=3) AS requestlimitreached FROM attempts WHERE ((ipaddress=$1) AND (DATE_PART('day',NOW() - attemptdatetime)*24 + DATE_PART('hour',NOW() - attemptdatetime)) <= 1)", ipAddress)
    const requestLimitReached = query.requestlimitreached;
    if(requestLimitReached) {
        return({error: 'requestLimitReached', msg: 'Muitas tentativas registradas, tente novamente mais tarde.'});
    }
    await db.query('INSERT INTO attempts (ipaddress, attemptdatetime) VALUES ($1,NOW())',ipAddress);

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

    const baseChance = Math.floor(Math.random * 100);
    let drawnOption;
    if(baseChance < 90) {
        const failureOptions = options.filter(option => option.resultType !== 'success');
        if(failureOptions.length === 0){
            drawnOption = (options.sort(() => Math.random() > .5 ? 1 : -1)[0]);
        }else {
            drawnOption = failureOptions.sort(() => Math.random() > .5 ? 1 : -1)[0]
        }
    }else {
        drawnOption = options[Math.floor(Math.random()*options.length)];
    }

    //increment option drawNumber
    await db.none('UPDATE availablePrizes SET drawnumber=$1 WHERE id=$2',[drawnOption.drawNumber + 1, drawnOption.id]);

    //generate session
    let values = drawnOption.resultType === 'success' ? 
        [drawnOption.resultType, drawnOption.amount, userId] :
        [drawnOption.resultType, null, userId];
    
    await db.none('INSERT INTO sessions (spindatetime, spinresulttype, spinresultamount, user_id) VALUES (NOW(),$1,$2,$3)', values);
    let drawnPrizeId;
    //include prize in drawnPrizes
    if(values[0] === 'success'){
        const cs = new pgp.helpers.ColumnSet(
            ['amount', 'windatetime', 'ispending', 'user_id'],
            {table: 'drawnPrizes'}
        );

        drawnPrizeId = await (db.one(pgp.helpers.insert({
            amount: drawnOption.amount,
            windatetime: new Date().toISOString(),
            ispending: true,
            user_id: userId
        },cs) + 'RETURNING id')).id;
    }

    //notify user of the result
    return({
        position: drawnOption.position,
        resultType: drawnOption.resultType,
        amount: drawnOption.resultType === 'success' ? drawnOption.amount : undefined,
        drawnPrizeId: drawnPrizeId
    });
}
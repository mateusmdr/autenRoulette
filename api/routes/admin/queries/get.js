import crypto from 'crypto';

import {db} from '../../../utils/db.js';
import 'dotenv/config';

export const isLoggedIn = async ({email, pwdHash}) => {
    const query = await db.oneOrNone('SELECT (pwdhash) FROM admins WHERE email=$1',email);
    if(!query) return false;
    

    const digest = crypto.createHash('sha512').update(`${email}${pwdHash}${process.env.SALT}`).digest('hex');
    return (digest === query.pwdhash);
}

export const getAvailablePrizes = async () => {
    const query = await db.any('SELECT * FROM availablePrizes');
    return query.map((item, index) => {
        return {
            id: item.id,
            position: index + 1,
            resultType: item.resulttype,
            amount: Number(item.amount),
            maxDraws: Number(item.maxdraws),
            resetPeriod: item.resetperiod,
            drawNumber: Number(item.drawnumber)
        };
    });
}

export const getPendingPrizes = async () => {
    const query = await db.any('SELECT d.id as id, d.amount as amount, d.pixkey as pixkey, d.windatetime as windatetime, u.name as name, u.phone as phone FROM (drawnPrizes as d JOIN users as u ON d.user_id = u.id) WHERE d.ispending');
    console.log(query);
    return query.map(item => {
        return {
            id: item.id,
            amount: Number(item.amount),
            pixKey: item.pixkey,
            winDateTime: item.windatetime,
            name: item.name,
            phone: item.phone
        };
    });
}
export const getGivenPrizes = async () => {
    const query = await db.any('SELECT d.id as id, d.amount as amount, d.pixkey as pixkey, d.windatetime as windatetime, d.paymentdatetime as paymentdatetime, u.name as name, u.phone as phone FROM (drawnPrizes as d JOIN users as u ON d.user_id = u.id) WHERE NOT d.ispending');
    return query.map(item => {
        return {
            id: item.id,
            amount: Number(item.amount),
            pixKey: item.pixkey,
            winDateTime: item.windatetime,
            paymentDateTime: item.paymentdatetime,
            name: item.name,
            phone: item.phone
        };
    });
}

export const getAds = async () => {
    const query = await db.any('SELECT * FROM ads');
    return query.map(item => {
        return {
            id: item.id,
            companyName: item.companyname,
            locationFilter: item.locationfilter,
            initialDateTime: item.initialdatetime,
            expirationDateTime: item.expirationdatetime,
            imgFileName: item.imgfilename,
            linkURL: item.linkurl
        };
    });
}
export const getUsers = async () => {
    const query = await db.any('SELECT * FROM users');
    return query.map(item => {
        return {
            id: item.id,
            name: item.name,
            phone: item.phone,
            userAgent: item.useragent,
        };
    });
}

export const getPendingPrizeCount = async () => {
    const query = await db.one('SELECT COUNT(*) FROM drawnPrizes WHERE ispending');
    return query;
}
export const getGivenPrizeCount = async () => {
    const query = await db.one('SELECT COUNT(*) FROM drawnPrizes WHERE NOT ispending');
    return query;
}
export const getAdCount = async () => {
    const query = await db.one('SELECT COUNT(*) FROM ads');
    return query;
}
export const getUserCount = async () => {
    const query = await db.one('SELECT COUNT(*) FROM users');
    return query;
}
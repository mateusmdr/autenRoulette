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
    return query;
}

export const getPendingPrizes = async () => {
    const query = await db.any('SELECT * FROM drawnPrizes WHERE ispending');
    return query;
}
export const getGivenPrizes = async () => {
    const query = await db.any('SELECT * FROM drawnPrizes WHERE NOT ispending');
    return query;
}

export const getAds = async () => {
    const query = await db.any('SELECT * FROM ads');
    return query;
}
export const getUsers = async () => {
    const query = await db.any('SELECT * FROM users');
    return query;
}

export const getPendingPrizeCount = async () => {
    const query = await db.one('SELECT COUNT(*) FROM drawnPrizes WHERE ispending');
    return query[0];
}
export const getGivenPrizeCount = async () => {
    const query = await db.one('SELECT COUNT(*) FROM drawnPrizes WHERE NOT ispending');
    return query[0];
}
export const getAdCount = async () => {
    const query = await db.one('SELECT COUNT(*) FROM ads');
    return query[0];
}
export const getUserCount = async () => {
    const query = await db.one('SELECT COUNT(*) FROM users');
    return query[0];
}
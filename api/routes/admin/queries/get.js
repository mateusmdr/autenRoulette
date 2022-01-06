import crypto from 'crypto';

import db from '../../../utils/db.js';
import 'dotenv/config';

const isLoggedIn = async ({email, password}) => {
    const query = await db.oneOrNone('SELECT (pwdHash) FROM admins WHERE email=$1',email);
    if(!query) return false;
    const digest = crypto.createHash('sha512').update(`${email}${password}${process.env.SALT}`).digest('hex');
    return (digest === query.pwdhash);
}

export {isLoggedIn};
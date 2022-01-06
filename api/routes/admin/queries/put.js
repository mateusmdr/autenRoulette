import crypto from 'crypto';

import db from '../../../utils/db.js';
import 'dotenv/config';

const createAdmin = async ({email, password}) => {
    const pwdHash = crypto.createHash('sha512').update(`${email}${password}${process.env.SALT}`).digest('hex');

    const query = await db.query('INSERT INTO admins (email, pwdHash) VALUES ($1,$2)',[email,pwdHash]);
}

export {createAdmin};
import crypto from 'crypto';

import {db, pgp} from '../../../utils/db.js';
import 'dotenv/config';

export const createAdmin = async ({email, password}) => {
    const pwdHash = crypto.createHash('sha512').update(password).digest('hex');
    const digest = crypto.createHash('sha512').update(`${email}${pwdHash}${process.env.SALT}`).digest('hex');

    await db.query('INSERT INTO admins (email, pwdHash) VALUES ($1,$2)',[email,digest]);
}

export const createAd = async({companyName, initialDateTime, expirationDateTime, linkURL, locationFilter, imgFileName}) => {
    const cs = new pgp.helpers.ColumnSet(
        ['companyname', 'initialdatetime', 'expirationdatetime',
        'linkurl', 'locationfilter', 'imgfilename'],
        {table: 'ads'}
    );
    
    await db.query(pgp.helpers.insert({
        companyname: companyName,
        initialdatetime: initialDateTime,
        expirationdatetime: expirationDateTime,
        linkurl: linkURL,
        locationfilter: locationFilter,
        imgfilename: imgFileName
    },cs));
};
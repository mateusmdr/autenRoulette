import {db, pgp} from '../../../utils/db.js';

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
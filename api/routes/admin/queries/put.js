import fs from 'fs';
import path from 'path';

import {db, pgp} from '../../../utils/db.js';

export const confirmPayment = async ({id, paymentDateTime}) => {
    await db.query('UPDATE drawnprizes SET (ispending, paymentdatetime) = (FALSE, $2) WHERE id=$1',[id, paymentDateTime]);
}

export const updateAvailablePrize = async ({id, resultType, amount, maxDraws, resetPeriod}) => {
    const cs = new pgp.helpers.ColumnSet(
        ['maxdraws', 'amount', 'resulttype','resetperiod', 'drawnumber'],
        {table: 'availableprizes'}
    );
    const condition = pgp.as.format(' WHERE id = $1', id);
    const isSuccess = resultType === 'success';
    const sql = (pgp.helpers.update({
        maxdraws: isSuccess ? maxDraws: null,
        amount: isSuccess ? amount: null,
        resulttype: resultType,
        resetperiod: isSuccess ? resetPeriod: null,
        drawnumber: isSuccess ? 0 : null
    },cs) + condition);

    await db.query(sql);
}

export const updateAd = async({id, companyName, initialDateTime, expirationDateTime, linkURL, locationFilter, imgFileName}) => {
    //Get old imageFile
    const {imgfilename} = await db.one('SELECT imgfilename FROM ads WHERE id=$1',id);

    const cs = new pgp.helpers.ColumnSet(
        ['companyname', 'initialdatetime', 'expirationdatetime',
        'linkurl', 'locationfilter', 'imgfilename'],
        {table: 'ads'}
    );
    
    const condition = pgp.as.format(' WHERE id = $1', id);
    const sql = (pgp.helpers.update({
        companyname: companyName,
        initialdatetime: initialDateTime,
        expirationdatetime: expirationDateTime,
        linkurl: linkURL,
        locationfilter: locationFilter,
        imgfilename: imgFileName
    },cs) + condition);
    await db.query(sql);
    
    fs.unlinkSync(path.join(path.resolve(),'./assets/',imgfilename)); // Remove old imageFile from assets
};
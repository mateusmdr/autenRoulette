import {db, pgp} from '../../../utils/db.js';

export const confirmPayment = async ({id, paymentDateTime}) => {
    await db.query('UPDATE drawnprizes SET (ispending, paymentdatetime) = (FALSE, $1) WHERE id=$2',[id, paymentDateTime]);
}

export const updateAvailablePrize = async ({position, resultType, amount, maxDraws, resetPeriod}) => {
    const cs = new pgp.helpers.ColumnSet(
        ['maxdraws', 'amount', 'resulttype','resetperiod'],
        {table: 'availableprizes'}
    );

    const condition = pgp.as.format(' WHERE id = $1', position);
    const sql = (pgp.helpers.update({
        maxdraws: maxDraws,
        amount,
        resulttype: resultType,
        resetperiod: resetPeriod,
    },cs) + condition);

    await db.query(sql);
}

export const updateAd = async({id, companyName, initialDateTime, expirationDateTime, linkURL, locationFilter, imagePath}) => {
    const cs = new pgp.helpers.ColumnSet(
        ['companyname', 'initialdatetime', 'expirationdatetime',
        'linkurl', 'locationfilter', 'imagepath'],
        {table: 'ads'}
    );
    
    const condition = pgp.as.format(' WHERE id = $1', id);
    const sql = (pgp.helpers.update({
        companyname: companyName,
        initialdatetime: initialDateTime,
        expirationdatetime: expirationDateTime,
        linkurl: linkURL,
        locationfilter: locationFilter,
        imagepath: imagePath
    },cs) + condition);

    await db.query(sql);
};
import {body} from 'express-validator';

export const confirmPayment = [
    body('id').exists().isInt({min: 1}),
    body('paymentDateTime').exists().isISO8601(),
]

export const updateAvailablePrize = [
    body('id').exists().isInt({min: 1}),
    body('resultType').exists().isIn(['success', 'fail', 'retry']),
    body('amount').if(body('resultType').equals('success'))
        .exists().isNumeric({locale: 'en-US'}),
    body('maxDraws').if(body('resultType').equals('success'))
        .exists().isInt({min: 1}),
    body('resetPeriod').if(body('resultType').equals('success'))
        .exists().isIn(['daily','weekly','monthly','yearly'])
]

export const updateAd = [
    body('id').exists().isInt({min: 1}),
    body('companyName').exists().isString().notEmpty(),
    body('initialDateTime').exists().isISO8601(),
    body('expirationDateTime').exists().isISO8601(),
    body('linkURL').exists().isFQDN(),
    body('locationFilter').exists().isJSON(),
    body('imgFileName').isString().notEmpty(),
];
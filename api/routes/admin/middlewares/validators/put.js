import {body} from 'express-validator';
import isURL from 'validator/lib/isURL.js';

export const confirmPayment = [
    body('id').exists().isInt({min: 1}),
    body('paymentDateTime').exists().isISO8601(),
]

export const updateAvailablePrize = [
    body('id').exists().isInt({min: 1}),
    body('resultType').exists().isIn(['success', 'fail', 'retry']),
    body('amount', 'O valor do prêmio deve ser um número positivo.')
        .if(body('resultType').equals('success'))
        .exists().isFloat({locale: 'en-US', min: 0}),
    body('maxDraws', 'O máximo de sorteios deve ser um número positivo.')
        .if(body('resultType').equals('success'))
        .exists().isInt({min: 1}),
    body('resetPeriod', 'Selecione um período válido.')
        .if(body('resultType').equals('success'))
        .exists().isIn(['daily','weekly','monthly','yearly'])
]

export const updateAd = [
    body('id').exists().isInt({min: 1}),
    body('companyName', 'O nome da empresa é um campo obrigatório').exists().isString().notEmpty().trim(),
    body('initialDateTime').exists().isISO8601(),
    body('expirationDateTime').exists().isISO8601(),
    body('linkURL', 'O link deve ser uma URL válida').exists().custom(link => {
        return(
            isURL(String(link).replace(/^(((http[s]?|ftp):)?(\/\/))/g,''))
        );
    }).customSanitizer((link) => {
        return(
            (String(link).match(/^(((http[s]?|ftp):)?(\/\/))/g)) ? link : `//${link}` // force absolute ref to linkURL
        )
    }),
    body('locationFilter').exists().isJSON(),
    body('expirationDateTime', 'A data de expiração deve ser após a data de início.').custom((value, {req}) => {
        return(new Date(value).getTime() > new Date(req.body.initialDateTime).getTime());
    })
];
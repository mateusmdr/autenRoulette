import {body} from 'express-validator';

export const createAd = [
    body('companyName').exists().isString().notEmpty(),
    body('initialDateTime').exists().isISO8601(),
    body('expirationDateTime').exists().isISO8601(),
    body('linkURL').exists().isFQDN(),
    body('locationFilter').exists().isJSON(),
    body('imgFileName').exists().isString().notEmpty(),
]
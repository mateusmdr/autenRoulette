import {body} from 'express-validator';

export const setPixKey = [
    body('pixKey').exists().notEmpty().custom((v, {req}) => !!req.session.drawnPrizeId)
]
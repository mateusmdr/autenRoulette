import {body} from 'express-validator';

export const setPixKey = [
    body('pixKey').exists().bail().notEmpty().bail().custom((v, {req}) => !!req.session.drawnPrizeId)
]
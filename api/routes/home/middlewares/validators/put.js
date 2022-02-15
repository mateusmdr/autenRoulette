import {body} from 'express-validator';

export const setPixKey = [
    body('pixKey', 'Chave PIX inválida').exists().bail().notEmpty().bail()
    .blacklist('\-\/\s')
]
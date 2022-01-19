import {body} from 'express-validator';

export const registerUser = [
    body('name', 'O campo nome é inválido.').if((value, {req}) => !req.session.userId)
        .exists().notEmpty()
        .trim().toUpperCase(),
    body('phone', 'O campo telefone é inválido.').if((value, {req}) => !req.session.userId)
        .exists().isMobilePhone('pt-BR')
        .blacklist('\\(\\)\\-\\s'),
];
import {body, checkSchema} from 'express-validator';

export const registerUser = [
    body('name', 'O campo nome é inválido.').if((value, {req}) => !req.session.userId)
        .exists().bail().notEmpty().bail()
        .trim().toUpperCase()
        .blacklist('0-9'),
    body('phone', 'O campo telefone é inválido.').if((value, {req}) => !req.session.userId)
        .exists().bail().notEmpty().bail().isMobilePhone('pt-BR')
        .blacklist('\\(\\)\\-\\s'),
];

export const generateDrawnOption = checkSchema(
    {
        userId: {
            custom: (v, {req}) => !!req.session.userId,
            errorMessage: 'É necessário fazer login para girar a roleta',
        }
    }
);
export const generateAds = [
    body('position', 'Formato de posição inválido').exists()
];
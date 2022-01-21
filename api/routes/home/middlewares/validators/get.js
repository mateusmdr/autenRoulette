import {body} from 'express-validator';

export const getAds = [
    body('location').exists().bail().isJSON()
];
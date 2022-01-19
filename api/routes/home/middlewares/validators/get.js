import {body} from 'express-validator';

export const getAds = [
    body('location').exists().isJSON()
];
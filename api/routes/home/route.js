import express from "express";
import path from 'path';

import 'dotenv/config';

import * as get from './queries/get.js';
import * as put from './queries/put.js';
import * as post from './queries/post.js';

import validationMiddleware from '../../utils/validator.js';

import * as getValidators from './middlewares/validators/get.js';
import * as postValidators from './middlewares/validators/post.js';
import * as putValidators from './middlewares/validators/put.js';

const route = express.Router();

/**Home route */
route.get('/',(req, res) => {
    res.json();
});
/***/

/**Image storage */
route.get('/assets/:filename', (req, res) => {
    if(req.params.filename.match(/(\.\.)|(\\)|(\/)/g))
        return res.status(404).send({error: 'Not Found'});

    console.log(req.params.filename);
    const assetPath = path.join(path.resolve(),'./assets/', req.params.filename);
    res.sendFile(assetPath);
});
/***/

route.get('/getAds',
    validationMiddleware(getValidators.getAds),
    async (req,res) => {
        const ads = await get.getAds(req.body);
        return res.json(ads);
    }
);

route.post('/generateDrawnOption',
    validationMiddleware(postValidators.registerUser),
    async (req,res) => {
        let userId;
        if(!req.session.userId) {
            userId = await post.registerUser(req.body);
            req.session.userId = userId;
        }else {
            userId = req.session.userId;
        }
        const drawnOption = await post.generateDrawnOption({userId, ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress });

        //set drawnPrizeId cookie
        req.session.drawnPrizeId = drawnOption.drawnPrizeId;
        return res.json(drawnOption);
    }
);

route.put('/setPixKey',
    validationMiddleware(putValidators.setPixKey),
    async (req,res) => {
        await put.setPixKey({...req.body, drawnPrizeId: req.session.drawnPrizeId});
        req.session.drawnPrizeId = undefined;
        return res.json();
    }
);

export default route;
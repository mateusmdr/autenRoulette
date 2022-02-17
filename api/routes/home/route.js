import express from "express";
import path from 'path';
import 'dotenv/config';

import * as get from './queries/get.js';
import * as put from './queries/put.js';
import * as post from './queries/post.js';

import validationMiddleware from '../../utils/validator.js';

import * as postValidators from './middlewares/validators/post.js';
import * as putValidators from './middlewares/validators/put.js';

const route = express.Router();
/**Home route */
route.get('/',(req, res) => {
    res.json(null);
});
/***/

/**Image storage */
route.get('/assets/:filename', (req, res) => {
    if(req.params.filename.match(/(\.\.)|(\\)|(\/)/g))
        return res.status(404).send({error: 'Not Found'});

    const assetPath = path.join(path.resolve(),'./assets/', req.params.filename);
    res.sendFile(assetPath);
});
/***/

route.post('/generateAds',
    async (req,res) => {
        const ads = await post.generateAds(req.body);
        return res.json(ads);
    }
);

route.get('/getAvailablePrizes', async (req, res) => {
    res.json(await get.getAvailablePrizes());
});
route.post('/registerUser',
    validationMiddleware(postValidators.registerUser),
    async (req,res) => {
        if(!req.session.userId) {
            req.session.userId = await post.registerUser(req.body);
        }
        res.json(null);
    }
);

route.post('/generateDrawnOption',
    postValidators.generateDrawnOption,
    async (req,res) => {
        const drawnOption = await post.generateDrawnOption({userId: req.session.userId, ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress });

        if(drawnOption.error === 'userNotFound'){
            req.session.userId = undefined;
            return res.status(429).json(drawnOption)
        }
        if(!!drawnOption.error) return res.status(429).json(drawnOption);
        
        //set drawnPrizeId cookie
        if(drawnOption.resultType === 'success'){
            req.session.drawnPrizeId = drawnOption.drawnPrizeId;
        }
        return res.json(drawnOption);
    }
);

route.put('/setPixKey',
    validationMiddleware(putValidators.setPixKey),
    async (req,res) => {
        await put.setPixKey({...req.body, drawnPrizeId: req.session.drawnPrizeId});
        req.session.drawnPrizeId = undefined;
        return res.json(null);
    }
);

export default route;
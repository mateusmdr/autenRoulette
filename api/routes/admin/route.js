import express from "express";

import * as get from './queries/get.js';
import * as put from './queries/put.js';

const route = express.Router();

/**Let the client know if it's authenticated */
route.get('/isLoggedIn', async(req, res) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent' });
    } else {
        const auth = (Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString('utf8')).split(':');
        const signed = await get.isLoggedIn({email: auth[0], pwdHash: auth[1]});

        if(!signed) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }else {
            return res.status(200).json();
        }
    }
});

/**Authentication Middleware */
route.use('*', async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent' });
    } else {
        const auth = (Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString('utf8')).split(':');

        const signed = await get.isLoggedIn({email: auth[0], pwdHash: auth[1]});

        if(!signed) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
    }
    next();
});

/**Admin route */
route.get('/', (req,res) => {
    res.json();
});

route.get('/:action', async (req,res) => {
    const method = get[req.params.action];
    if(!method) return res.status(404).json({ error: 'Not Found' });

    return res.json(await method());
});

route.put('/:action', async (req,res) => {
    throw {code: '23502'};
    const method = put[req.params.action];
    if(!method) return res.status(404).json({ error: 'Not Found' });

    await method(req.body);
    return res.json();
});

export default route;
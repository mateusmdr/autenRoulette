import express from "express";

import * as get from './queries/get.js';
import * as put from './queries/put.js';

const route = express.Router();

const handle = (e) => e.code;

/**Let the client know if it's authenticated */
route.get('/isLoggedIn', async(req, res) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent' });
    } else {
        const auth = (Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString('utf8')).split(':');

        const signed = await get.isLoggedIn({email: auth[0], password: auth[1]});

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

        const signed = await get.isLoggedIn({email: auth[0], password: auth[1]});

        if(!signed) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
    }
    next();
});

/**Admin route */
route.get('/', (req,res) => {
    res.status(200).json(null);
});

route.get('/:action', async (req,res) => {
    try {
        // switch(req.params.action) {

        // }
        res.status(200).json();
    }catch(e) {
        console.error(e);
        res.status(500).json(handle(e));
    }
});

route.put('/:action', async (req,res) => {
    try {
        switch(req.params.action) {
            case 'createAdmin':
                await put.createAdmin(req.body);
                return res.status(200).json();
            default:
                res.status(400).json({ error: 'Bad Request' });
        }
    }catch(e) {
        console.error(e);
        res.status(500).json(handle(e));
    }
});

export default route;
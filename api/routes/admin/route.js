import express from "express";
import multer from 'multer';

import * as get from './queries/get.js';
import * as put from './queries/put.js';
import * as post from './queries/post.js';
import * as del from './queries/delete.js';

const route = express.Router();
const upload = multer({dest: 'assets/'});

/**Let the client know if it's authenticated */
route.get('/', (req,res) => {
    res.json();
});

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

route.post('/uploadBanner',upload.single('banner'), (req, res) => {
    console.log(req.file);
    res.json(200);
})

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
route.get('/:action', async (req,res) => {
    const method = get[req.params.action];
    if(!method) return res.status(404).json({ error: 'Not Found' });

    return res.json(await method());
});



route.put('/:action', async (req,res) => {
    const method = put[req.params.action];
    if(!method) return res.status(404).json({ error: 'Not Found' });

    await method(req.body);
    return res.json();
});

route.post('/:action', async (req,res) => {
    const method = post[req.params.action];
    if(!method) return res.status(404).json({ error: 'Not Found' });

    return res.json(await method());
});

route.delete('/:action', async (req,res) => {
    const method = del[req.params.action];
    if(!method) return res.status(404).json({ error: 'Not Found' });

    await method(req.body);
    return res.json();
});

route.use('*', (req, res) => res.status(404).json({error: 'Not Found'}));

export default route;
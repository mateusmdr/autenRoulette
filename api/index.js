import express from 'express';
import cors from 'cors';

import admin from './routes/admin.js';

import 'dotenv/config';

/**API setup */

const api = express();
api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.disable('x-powered-by'); //Remove X-Powered-By header

api.listen(process.env.PORT, () => {
    console.log(`The API is now listening to port ${process.env.PORT}!`);
});

/**API routes */

api.use('/admin',admin);

api.get('/',(req, res) => {
    res.sendStatus(200);
});

/***/
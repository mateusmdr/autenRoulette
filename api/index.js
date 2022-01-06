import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import admin from './routes/admin/route.js';
import home from './routes/home/route.js'

import 'dotenv/config';

/**API setup */
const api = express();
api.disable('x-powered-by'); //Remove X-Powered-By header

/**General Middlewares */
api.use(cors());
api.use(express.json());

/**API routes */
api.use('/admin', admin);
api.use('/', home);
api.use('*', (req, res) => res.status(404).json());

/**Error handler */
api.use((err, req, res, next) => {
    if(err.code === '23502') return res.status(400).json({error: 'not_null_violation'})
    
    console.error(err);
    res.status(500).json();
});

/**Port listening */
api.listen(process.env.PORT, () => {
    console.log(`The API is now listening to port ${process.env.PORT}!`);
});
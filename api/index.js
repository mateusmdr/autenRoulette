import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import cookieSession from 'cookie-session';

import admin from './routes/admin/route.js';
import home from './routes/home/route.js'

import 'dotenv/config';

// Schedule jobs
import './jobs.js';

/**API setup */
const api = express();
api.disable('x-powered-by'); //Remove X-Powered-By Header

/**General Middlewares */
api.use('*',cors({
    origin: process.env.ORIGIN,
    credentials: true
}));

api.use('*',express.json());

/**Auth cookies */
api.use('*',cookieSession({
    name: 'session',
    keys: [process.env.KEY1, process.env.KEY2 ],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 * 30, // 30 days
    httpOnly: true
}));
/***/

/**Validation Middleware */
api.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) return res.status(400).json({error: 'Malformed JSON'});

    next();
})

/**API routes */
api.use('/admin', admin);
api.use('/', home);
api.use('*', (req, res) => res.status(404).json({error: 'Not Found'}));

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
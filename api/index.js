import express from 'express';
import cors from 'cors';

import admin from './routes/admin';

// import 'dotenv/config';

/**API setup */

const api = express();
api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.disable('x-powered-by'); //Remove X-Powered-By header

api.use('/admin',admin)

api.listen(3000, () => {
    console.log(`The API is now listening to port ${3000}!`);
});

/**API routes */

api.get('/',(req, res) => {
    res.sendStatus(200);
});

/***/
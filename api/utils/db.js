import pgPromise from 'pg-promise';
import 'dotenv/config';

const pgp = pgPromise({
    capSQL: true
});

const cn = {
    host: process.env.DB_ADDRESS,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    client_encoding: 'utf8',
    application_name: process.env.APPLICATION_NAME
};

pgp.pg.types.setTypeParser(1114, str => str);

const db = pgp(cn);

export {db, pgp};
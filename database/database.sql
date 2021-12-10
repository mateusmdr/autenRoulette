/*Database structure*/
DROP DATABASE IF EXISTS roulette;

CREATE DATABASE roulette
    OWNER postgres
    ENCODING UTF8
    TEMPLATE template0
;

ALTER DATABASE roulette SET datestyle TO SQL, MDY;
ALTER DATABASE roulette SET timezone TO UTC;

/*Custom data types*/
CREATE TYPE IF NOT EXISTS result_t AS ENUM('success', 'fail', 'retry');
CREATE TYPE IF NOT EXISTS period_t AS ENUM('daily', 'weekly', 'monthly', 'yearly');
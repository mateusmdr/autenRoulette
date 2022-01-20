/*Database structure*/
CREATE DATABASE roulette
    OWNER postgres
    ENCODING UTF8
    TEMPLATE template0
;

ALTER DATABASE roulette SET datestyle TO SQL, MDY;
ALTER DATABASE roulette SET timezone TO UTC;

/*Custom data types*/
CREATE TYPE result_t AS ENUM('success', 'fail', 'retry');
CREATE TYPE period_t AS ENUM('weekly', 'monthly');
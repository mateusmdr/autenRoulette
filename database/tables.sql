/*Tables related to user*/
CREATE TABLE IF NOT EXISTS users (
    id SERIAL NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS drawnPrizes (
    id SERIAL NOT NULL,
    amount NUMERIC NOT NULL,
    pixKey TEXT,
    winDateTime TIMESTAMP NOT NULL,
    isPending BOOLEAN NOT NULL,
    paymentDatetime TIMESTAMP,
    user_id INTEGER NOT NULL,

    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id),

    /*Require field to be filled if transaction has been made*/
    CHECK (
        (isPending AND paymentDatetime IS NULL) OR 
        (NOT isPending AND paymentDatetime IS NOT NULL)
    )
);

CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL NOT NULL,
    spinDatetime TIMESTAMP NOT NULL,
    spinResultType result_t NOT NULL,
    spinResultAmount NUMERIC,
    user_id INTEGER,

    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id),

    /*Require field to be filled if result type was success*/
    CHECK (
        (spinResultType!='success' AND spinResultAmount IS NULL) OR 
        (spinResultType='success' AND spinResultAmount IS NOT NULL AND spinResultAmount>0)
    )
);

CREATE TABLE IF NOT EXISTS attempts (
    id SERIAL NOT NULL,
    ipAddress TEXT NOT NULL,
    attemptDateTime TIMESTAMP NOT NULL
);

/*Tables related to admin*/
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL NOT NULL,
    email TEXT UNIQUE NOT NULL,
    pwdHash TEXT NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS availablePrizes (
    id SERIAL NOT NULL,
    maxDraws INTEGER,
    amount NUMERIC,
    resultType result_t NOT NULL,
    resetPeriod period_t,
    drawNumber INTEGER,

    PRIMARY KEY(id),

    /*Require field to be filled and positive if result type was success*/
    CHECK (
        (resultType!='success' AND amount IS NULL AND maxDraws IS NULL) OR 
        (resultType='success' AND amount IS NOT NULL AND amount>0 AND maxDraws IS NOT NULL)
    ),
    CHECK (
        (resultType!='success' AND amount IS NULL) OR 
        (resultType='success' AND amount IS NOT NULL AND amount>0)
    ),
    CHECK (
        (resultType!='success' AND resetPeriod IS NULL) OR 
        (resultType='success' AND resetPeriod IS NOT NULL)
    ),
    CHECK (
        (resultType!='success' AND drawNumber IS NULL) OR 
        (resultType='success' AND drawNumber IS NOT NULL)
    ),
    /*Require field to be positive*/    
    CHECK (maxDraws > 0),
    CHECK (drawNumber >= 0)
);

CREATE TABLE IF NOT EXISTS ads (
    id SERIAL NOT NULL,
    companyName TEXT NOT NULL,
    locationFilter TEXT NOT NULL,
    initialDatetime TIMESTAMP NOT NULL,
    expirationDatetime TIMESTAMP NOT NULL,
    imgFileName TEXT NOT NULL,
    linkUrl TEXT NOT NULL,

    PRIMARY KEY(id),

    /*Require inital date to happen previous to the expiration date*/
    CHECK (
        (initialDatetime < expirationDatetime)
    )
);

CREATE TABLE IF NOT EXISTS probability_updates (
    id SERIAL NOT NULL,
    probability NUMERIC NOT NULL,
    update_datetime TIMESTAMP NOT NULL DEFAULT NOW(),

    CHECK (
        0 < probability AND probability < 1
    )
);
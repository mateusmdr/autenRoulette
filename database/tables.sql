/*Tables related to user*/
CREATE TABLE IF NOT EXISTS users (
    id SERIAL NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    ipAddress TEXT,

    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS drawnPrizes (
    id SERIAL NOT NULL,
    amount NUMERIC NOT NULL,
    pixKey TEXT NOT NULL,
    winDateTime TIMESTAMP NOT NULL,
    isPending BOOLEAN NOT NULL,
    paymentDatetime TIMESTAMP,
    user_id INTEGER,

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
    location TEXT,
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

/*Tables related to admin*/
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL NOT NULL,
    emain TEXT UNIQUE NOT NULL,
    pwdHash TEXT NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS availablePrizes (
    id SERIAL NOT NULL,
    maxDraws INTEGER NOT NULL,
    amount NUMERIC,
    resultType result_t NOT NULL,
    resetPeriod period_t NOT NULL,
    drawNumber INTEGER NOT NULL,
    admin_id INTEGER,

    PRIMARY KEY(id),
    FOREIGN KEY(admin_id) REFERENCES admins(id),

    /*Require field to be filled and positive if result type was success*/
    CHECK (
        (resultType!='success' AND amount IS NULL) OR 
        (resultType='success' AND amount IS NOT NULL AND amount>0)
    ),
    /*Require field to be positive*/
    CHECK (maxDraws > 0),
    CHECK (drawNumber >= 0),
    /*Can't draw more than the maximum*/
    CHECK (drawNumber <= maxDraws)
);

CREATE TABLE IF NOT EXISTS ads (
    id SERIAL NOT NULL,
    companyName TEXT NOT NULL,
    locationFilter TEXT NOT NULL,
    initialDatetime TIMESTAMP NOT NULL,
    expirationDatetime TIMESTAMP NOT NULL,
    imagePath TEXT NOT NULL,
    linkUrl TEXT NOT NULL,
    admin_id INTEGER,

    PRIMARY KEY(id),
    FOREIGN KEY(admin_id) REFERENCES admins(id),

    /*Require inital date to happen previous to the expiration date*/
    CHECK (
        (initialDatetime < expirationDatetime)
    )
);
INSERT INTO ads (id,companyName,locationFilter,initialDatetime,expirationDatetime,imagePath,linkUrl) VALUES 
();

INSERT INTO availablePrizes (maxDraws, amount, resultType,resetPeriod,drawNumber)
VALUES
    (15, 5000, 'success', 'weekly', 5),
    (NULL, NULL, 'retry', 'yearly', 20),
    (NULL, NULL, 'fail', 'daily', 2),
    (15, 5000, 'success', 'weekly', 5),
    (NULL, NULL, 'retry', 'yearly', 20),
    (NULL, NULL, 'fail', 'daily', 2),
    (15, 5000, 'success', 'weekly', 5),
    (NULL, NULL, 'retry', 'yearly', 20),
    (NULL, NULL, 'fail', 'daily', 2),
    (15, 5000, 'success', 'weekly', 5),
    (NULL, NULL, 'retry', 'yearly', 20),
    (NULL, NULL, 'fail', 'daily', 2)
;

INSERT INTO drawnPrizes (amount, pixkey, windatetime, ispending, paymentdatetime)
VALUES
    (4000, '115.768.246-40', '2021-06-01', TRUE, NULL),
    (15000, '115.768.246-40', '2020-07-15', FALSE, '2020-08-19'),
    (4000, '115.768.246-40', '2021-06-01', TRUE, NULL),
    (15000, '115.768.246-40', '2020-07-15', FALSE, '2020-08-19'),
    (4000, '115.768.246-40', '2021-06-01', TRUE, NULL),
    (15000, '115.768.246-40', '2020-07-15', FALSE, '2020-08-19'),
    (4000, '115.768.246-40', '2021-06-01', TRUE, NULL),
    (15000, '115.768.246-40', '2020-07-15', FALSE, '2020-08-19'),
    (4000, '115.768.246-40', '2021-06-01', TRUE, NULL),
    (15000, '115.768.246-40', '2020-07-15', FALSE, '2020-08-19'),
    (4000, '115.768.246-40', '2021-06-01', TRUE, NULL),
    (15000, '115.768.246-40', '2020-07-15', FALSE, '2020-08-19')
;
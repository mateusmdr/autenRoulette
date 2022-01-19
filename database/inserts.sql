INSERT INTO users (name, phone) VALUES 
    ('Mateus Rezende', 34933000574),
    ('Cassiano Dias', 99999999999),
    ('Emerson Lemes', 99999999999)
;

INSERT INTO ads (id,companyName,locationFilter,initialDatetime,expirationDatetime,imagePath,linkUrl) VALUES 
();

INSERT INTO availablePrizes (maxDraws, amount, resultType,resetPeriod,drawNumber)
VALUES
    (15, 5000, 'success', 'weekly', 5),
    (NULL, NULL, 'retry', NULL, 20),
    (NULL, NULL, 'fail', NULL, 2),
    (15, 5000, 'success', 'weekly', 5),
    (NULL, NULL, 'retry', NULL, 20),
    (NULL, NULL, 'fail', NULL, 2),
    (15, 5000, 'success', 'weekly', 5),
    (NULL, NULL, 'retry', NULL, 20),
    (NULL, NULL, 'fail', NULL, 2),
    (15, 5000, 'success', 'weekly', 5),
    (NULL, NULL, 'retry', NULL, 20),
    (NULL, NULL, 'fail', NULL, 2)
;

INSERT INTO drawnPrizes (amount, pixkey, windatetime, ispending, paymentdatetime, user_id)
VALUES
    (4000, '115.768.246-40', '2021-06-01', TRUE, NULL,1),
    (15000, '115.768.246-40', '2020-07-15', FALSE, '2020-08-19',6),
    (4000, '115.768.246-40', '2021-06-01', TRUE, NULL,2),
    (15000, '115.768.246-40', '2020-07-15', FALSE, '2020-08-19',6),
    (4000, '115.768.246-40', '2021-06-01', TRUE, NULL,6),
    (15000, '115.768.246-40', '2020-07-15', FALSE, '2020-08-19',6),
    (4000, '115.768.246-40', '2021-06-01', TRUE, NULL,6),
    (15000, '115.768.246-40', '2020-07-15', FALSE, '2020-08-19',6),
    (4000, '115.768.246-40', '2021-06-01', TRUE, NULL,6),
    (15000, '115.768.246-40', '2020-07-15', FALSE, '2020-08-19',6),
    (4000, '115.768.246-40', '2021-06-01', TRUE, NULL,6),
    (15000, '115.768.246-40', '2020-07-15', FALSE, '2020-08-19',6)
;
INSERT INTO availablePrizes (maxDraws, amount, resultType,resetPeriod,drawNumber)
VALUES
    (15, 5000, 'success', 'weekly', 0),
    (NULL, NULL, 'retry', NULL, 0),
    (NULL, NULL, 'fail', NULL, 0),
    (15, 5000, 'success', 'weekly', 0),
    (NULL, NULL, 'retry', NULL, 0),
    (NULL, NULL, 'fail', NULL, 0),
    (15, 5000, 'success', 'weekly', 0),
    (NULL, NULL, 'retry', NULL, 0),
    (NULL, NULL, 'fail', NULL, 0),
    (15, 5000, 'success', 'weekly', 0),
    (NULL, NULL, 'retry', NULL, 0),
    (NULL, NULL, 'fail', NULL, 0)
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
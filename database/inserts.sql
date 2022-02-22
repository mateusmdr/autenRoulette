INSERT INTO availablePrizes (maxDraws, amount, resultType,resetPeriod,drawNumber)
VALUES
    (15, 5000, 'success', 'weekly', 0),
    (NULL, NULL, 'retry', NULL, NULL),
    (NULL, NULL, 'fail', NULL, NULL),
    (15, 5000, 'success', 'weekly', 0),
    (NULL, NULL, 'retry', NULL, NULL),
    (NULL, NULL, 'fail', NULL, NULL),
    (15, 5000, 'success', 'weekly', 0),
    (NULL, NULL, 'retry', NULL, NULL),
    (NULL, NULL, 'fail', NULL, NULL),
    (15, 5000, 'success', 'weekly', 0),
    (NULL, NULL, 'retry', NULL, NULL),
    (NULL, NULL, 'fail', NULL, NULL)
;

INSERT INTO probability_updates (probability)
VALUES
    (0.05);
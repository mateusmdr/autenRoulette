import {db} from '../../../utils/db.js';

export const getAvailablePrizes = async() => {
    const prizes = await db.many('SELECT id, resulttype, amount FROM availableprizes ORDER BY id');

    return prizes.map((prize) => {
        return ({
            id: prize.id,
            resultType: prize.resulttype,
            amount: prize.resulttype==='success' ? Number(prize.amount) : undefined,
        });
    });
};
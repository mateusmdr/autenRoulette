import {db} from '../../../utils/db.js';

export const getAvailablePrizes = async() => {
    const prizes = await db.many('SELECT id, resulttype, amount FROM availableprizes');

    return prizes.map((prize) => {
        return ({
            id: prize.id,
            resultType: prize.resulttype,
            amount: prize.resulttype==='success' ? Number(prize.amount) : undefined,
        });
    }).sort(() => Math.random() > 0.5 ? 1 : -1);
};
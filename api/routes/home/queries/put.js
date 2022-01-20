import {db} from '../../../utils/db.js';

export const setPixKey = async({pixKey, drawnPrizeId}) => {
    await db.none('UPDATE drawnPrizes SET pixKey=$1 WHERE id=$2',[pixKey, drawnPrizeId]);
}
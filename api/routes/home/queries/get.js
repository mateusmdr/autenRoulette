import {db} from '../../../utils/db.js';

export const getAvailablePrizes = async() => {
    const prizes = await db.many('SELECT id, resulttype, amount FROM availableprizes');

    return prizes.map((prize, index) => {
        return ({
            position: index + 1,
            resultType: prize.resulttype,
            amount: prize.resulttype==='success' ? Number(prize.amount) : undefined,
        });
    })
};

const drawTwo = (arr) => {
    const drawnSet = new Set();

    if(arr.length > 2) {
        while(drawnSet.size !== 2) {
            const randIndex = Math.floor(Math.random() * arr.length);
            drawnSet.add(arr[randIndex]);
        }
        return([...drawnSet]);
    }
    
    if(arr.length < 2) {
        return(new Array(2).fill(arr[0]));
    }
    
    return (arr);
}
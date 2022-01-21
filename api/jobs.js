import schedule from 'node-schedule';

import {db} from './utils/db.js';

const resetWeeklyPrizes = async () => {
    await db.none("UPDATE availablePrizes SET drawNumber=0 WHERE resetPeriod='weekly'");
}
const resetMonthlyPrizes = async () => {
    await db.none("UPDATE availablePrizes SET drawNumber=0 WHERE resetPeriod='monthly'");
}

schedule.scheduleJob('* * * * 0', (time) => {
    resetWeeklyPrizes();

    console.log(`${time.toLocaleDateString('pt-br')} às ${time.toLocaleTimeString('pt-br')}> Reset dos prêmios semanais`);
}); //Reset weekly prizes

schedule.scheduleJob('* * 1 * *', (time) => {
    resetMonthlyPrizes();

    console.log(`${time.toLocaleDateString('pt-br')} às ${time.toLocaleTimeString('pt-br')}> Reset dos prêmios mensais`);
}); //Reset monthly prizes
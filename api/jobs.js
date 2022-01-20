import schedule from 'node-schedule';

import {db} from 'util';

schedule.scheduleJob('* * * * 0', (time) => {
    console.log(`${time.toLocaleDateString('pt-br')} às ${time.toLocaleTimeString('pt-br')}> Reset dos prêmios semanais`);
}); //Reset weekly prizes

schedule.scheduleJob('* * 1 * *', (time) => {
    console.log(`${time.toLocaleDateString('pt-br')} às ${time.toLocaleTimeString('pt-br')}> Reset dos prêmios mensais`);
}); //Reset monthly prizes
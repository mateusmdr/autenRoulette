import {apiUrl, requestHeaders} from '../utils';

export const updateAd = async ({email, pwdHash, newAd}) => {
    const res = await fetch(apiUrl({route: '/admin/', method: 'updateAd'}), {
        mode: 'cors',
        method: 'PUT',
        headers: requestHeaders({email, pwdHash}),
        body: JSON.stringify(newAd)
    });

    return res.ok;
}

export const updateAvailablePrize = async ({email, pwdHash, newPrize}) => {
    const res = await fetch(apiUrl({route: '/admin/', method: 'updateAvailablePrize'}), {
        mode: 'cors',
        method: 'PUT',
        headers: requestHeaders({email, pwdHash}),
        body: JSON.stringify(newPrize)
    });

    console.log(newPrize);

    return res.ok;
}

export const confirmPayment = async ({email, pwdHash, id, paymentDateTime}) => {
    const res = await fetch(apiUrl({route: '/admin/', method: 'confirmPayment'}), {
        mode: 'cors',
        method: 'PUT',
        headers: requestHeaders({email, pwdHash}),
        body: JSON.stringify({id, paymentDateTime})
    });

    return res.ok;
}
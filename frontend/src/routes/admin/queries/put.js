import {apiUrl, requestHeaders, showErrors} from '../utils';

export const updateAd = async ({email, pwdHash, ad}) => {
    const formData  = new FormData();
    for(const param in ad) {
        formData.append(param, ad[param]);
        console.log(param, ad[param]);
    }

    const res = await fetch(apiUrl({route: '/admin/', method: 'updateAd'}), {
        mode: 'cors',
        method: 'PUT',
        headers: requestHeaders({email, pwdHash}, false),
        body: formData
    });

    return await showErrors(res);
}

export const updateAvailablePrize = async ({email, pwdHash, newPrize}) => {
    const res = await fetch(apiUrl({route: '/admin/', method: 'updateAvailablePrize'}), {
        mode: 'cors',
        method: 'PUT',
        headers: requestHeaders({email, pwdHash}),
        body: JSON.stringify(newPrize)
    });

    return await showErrors(res);
}

export const confirmPayment = async ({email, pwdHash, id, paymentDateTime}) => {
    const res = await fetch(apiUrl({route: '/admin/', method: 'confirmPayment'}), {
        mode: 'cors',
        method: 'PUT',
        headers: requestHeaders({email, pwdHash}),
        body: JSON.stringify({id, paymentDateTime})
    });

    return await showErrors(res);
}
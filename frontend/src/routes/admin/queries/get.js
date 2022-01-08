import {apiUrl, requestHeaders} from '../utils';

export const isLoggedIn = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl('isLoggedIn'), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return res.ok;
}

export const getAvailablePrizes = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl('getAvailablePrizes'), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return res.json();
}
export const getPendingPrizes = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl('getPendingPrizes'), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return res.json();
}
export const getGivenPrizes = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl('getGivenPrizes'), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return res.json();
}
export const getAds = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl('getAds'), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return res.json();
}
export const getUsers = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl('getUsers'), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return res.json();
}

export const getPendingPrizeCount = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl('getPendingPrizeCount'), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return (await res.json()).count;
}
export const getGivenPrizeCount = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl('getGivenPrizeCount'), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return (await res.json()).count;
}
export const getAdCount = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl('getAdCount'), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return (await res.json()).count;
}
export const getUserCount = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl('getUserCount'), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return (await res.json()).count;
}
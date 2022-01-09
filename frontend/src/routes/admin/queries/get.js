import {apiUrl, requestHeaders} from '../utils';

export const isLoggedIn = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl({route: '/admin/', method: 'isLoggedIn'}), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return res.ok;
}

export const getAvailablePrizes = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl({route: '/admin/', method: 'getAvailablePrizes'}), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return res.json();
}
export const getPendingPrizes = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl({route: '/admin/', method: 'getPendingPrizes'}), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return res.json();
}
export const getGivenPrizes = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl({route: '/admin/', method: 'getGivenPrizes'}), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return res.json();
}
export const getAds = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl({route: '/admin/', method: 'getAds'}), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return res.json();
}
export const getUsers = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl({route: '/admin/', method: 'getUsers'}), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return res.json();
}

export const getPendingPrizeCount = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl({route: '/admin/', method: 'getPendingPrizeCount'}), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return (await res.json()).count;
}
export const getGivenPrizeCount = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl({route: '/admin/', method: 'getGivenPrizeCount'}), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return (await res.json()).count;
}
export const getAdCount = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl({route: '/admin/', method: 'getAdCount'}), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return (await res.json()).count;
}
export const getUserCount = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl({route: '/admin/', method: 'getUserCount'}), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders({email, pwdHash}),
    });

    return (await res.json()).count;
}
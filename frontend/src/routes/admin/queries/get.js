import {apiUrl, requestHeaders} from '../utils';

export const isLoggedIn = async ({email, pwdHash}) => {
    const res = await fetch(apiUrl('isLoggedIn'), {
        mode: 'cors',
        headers: requestHeaders({email, pwdHash}),
    });

    return res.ok;
}

export const getAvailablePrizes = async ({email, pwdHash}) => {
    
}
export const getPendingPrizes = async ({email, pwdHash}) => {
    
}
export const getGivenPrizes = async ({email, pwdHash}) => {
    
}
export const getAds = async ({email, pwdHash}) => {
    
}
export const getUsers = async ({email, pwdHash}) => {
    
}

export const getPendingPrizeCount = async ({email, pwdHash}) => {
    
}
export const getGivenPrizeCount = async ({email, pwdHash}) => {
    
}
export const getAdCount = async ({email, pwdHash}) => {
    
}
export const getUserCount = async ({email, pwdHash}) => {
    
}
import {apiUrl, requestHeaders, showErrors} from '../utils';

export const getAvailablePrizes = async () => {
    const res = await fetch(apiUrl({route: '/', method: 'getAvailablePrizes'}), {
        mode: 'cors',
        method: 'GET',
        headers: requestHeaders
    });

    await showErrors(res);
    return await res.json();
}
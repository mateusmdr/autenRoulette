import {apiUrl, requestHeaders, showErrors} from '../utils';

export const registerUser = async ({name, phone}) => {
    const res = await fetch(apiUrl({route: '/', method: 'registerUser'}), {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: requestHeaders,
        body: JSON.stringify({name, phone})
    });

    await showErrors(res);
    return res.ok;
}

export const generateDrawnOption = async () => {
    const res = await fetch(apiUrl({route: '/', method: 'generateDrawnOption'}), {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: requestHeaders
    });

    await showErrors(res);
    return {json: res.ok ? await res.json() : null, ok: res.ok};
}

export const generateAds = async ({position}) => {
    const res = await fetch(apiUrl({route: '/', method: 'generateAds'}), {
        mode: 'cors',
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify({position})
    });

    await showErrors(res);
    return await res.json();
}
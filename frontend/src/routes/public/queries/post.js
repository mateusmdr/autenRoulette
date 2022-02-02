import {apiUrl, requestHeaders, showErrors} from '../utils';

export const registerUser = async ({name, phone}) => {
    const res = await fetch(apiUrl({route: '/', method: 'registerUser'}), {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: requestHeaders,
        body: JSON.stringify({name, phone})
    });
    const json = await res.json();
    if(!res.ok){
        showErrors(json);
    }

    return res.ok;
}

export const generateDrawnOption = async () => {
    const res = await fetch(apiUrl({route: '/', method: 'generateDrawnOption'}), {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: requestHeaders
    });

    const json = await res.json();
    if(!res.ok){
        showErrors(json);
    }

    return {json: res.ok ? json : null, ok: res.ok};
}

export const generateAds = async ({position}) => {
    const res = await fetch(apiUrl({route: '/', method: 'generateAds'}), {
        mode: 'cors',
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify({
            coords: position ? {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            } : null
        })
    });

    const json = await res.json();
    if(!res.ok){
        showErrors(json);
    }

    return json;
}
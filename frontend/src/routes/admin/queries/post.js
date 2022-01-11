import {apiUrl, requestHeaders} from '../utils';

export const createAd = async ({email, pwdHash, ad}) => {
    const res = await fetch(apiUrl({route: '/admin/', method: 'createAd'}), {
        mode: 'cors',
        method: 'POST',
        headers: requestHeaders({email, pwdHash}),
        body: JSON.stringify(ad)
    });

    return res.ok;
}
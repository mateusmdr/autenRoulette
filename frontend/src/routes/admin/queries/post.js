import {apiUrl, requestHeaders, showErrors} from '../utils';

export const createAd = async ({email, pwdHash, ad}) => {
    const formData  = new FormData();
    for(const param in ad) {
        formData.append(param, ad[param]);
        console.log(param, ad[param]);
    }

    const res = await fetch(apiUrl({route: '/admin/', method: 'createAd'}), {
        mode: 'cors',
        method: 'POST',
        headers: requestHeaders({email, pwdHash}, false),
        body: formData
    });

    return await showErrors(res);
}
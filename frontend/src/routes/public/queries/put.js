import {apiUrl, requestHeaders, showErrors} from '../utils';

export const setPixKey = async ({pixKey}) => {
    const res = await fetch(apiUrl({route: '/', method: 'setPixKey'}), {
        mode: 'cors',
        method: 'PUT',
        headers: requestHeaders,
        credentials: 'include',
        body: JSON.stringify({pixKey})
    });

    await showErrors(res);
    return res.ok;
}
import {apiUrl, requestHeaders} from '../utils';

// export const deleteAd = async ({email, pwdHash, id}) => {
//     const res = await fetch(apiUrl({route: '/admin/', method: 'deleteAd'}), {
//         mode: 'cors',
//         method: 'DELETE',
//         headers: requestHeaders({email, pwdHash}),
//         body: JSON.stringify({id})
//     });

//     return res.ok;
// }
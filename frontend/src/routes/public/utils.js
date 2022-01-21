export const apiUrl = ({method, route}) =>
    `${process.env.REACT_APP_API_ADDRESS}:${process.env.REACT_APP_API_PORT}${route}${method}`;

export const imgUrl = (imageName) => 
    `${apiUrl({route: '/', method: 'assets'})}/${imageName}`;
  
export const getData = async({method, setter}) => {
    const res = await method();
    setter(res);
}

export const showErrors = async (res) => {
    if(!res.ok) {
        const json = await res.json();
        const errorMsg = json.errors.reduce((acc, cur) => acc + '\n' + cur.msg,'');
        alert(errorMsg);
    }

    return res.ok;
}

const requestHeaders = new Headers();
requestHeaders.append('Content-Type', 'application/json');
export {requestHeaders};

export const formatDouble = (number) => String(Number(number).toFixed(2)).replace('.',',');

export const formatOption = (option) => {
    if(option.resultType === 'success') {
        return `R$ ${option.amount}`;
    }else if(option.resultType === 'fail') {
        return 'Nada 🙁';
    }else {
        return '+1 chance';
    }
}
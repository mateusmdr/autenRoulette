export const apiUrl = ({method, route}) =>
    `${process.env.REACT_APP_API_ADDRESS}${route}${method}`;

export const imgUrl = (imageName) => 
    `${apiUrl({route: '/', method: 'assets'})}/${imageName}`;
  
export const getData = async({method, setter}) => {
    const res = await method();
    setter(res);
}

export const showErrors = (res) => {
    if(res.errors){
        const errorMsg = res.errors.reduce((acc, cur) => acc + '\n' + cur.msg,'');
        alert(errorMsg);
    }else {
        alert(res.msg);
    }
}

const requestHeaders = new Headers();
requestHeaders.append('Content-Type', 'application/json');
requestHeaders.append('Access-Control-Allow-Origin', process.env.REACT_APP_API_PORT);
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
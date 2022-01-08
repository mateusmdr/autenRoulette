import base64 from 'base-64';

export const formatDouble = (number) => String(Number(number).toFixed(2)).replace('.',',');
export const formatPhone = (number) => number;
export const formatPixKey = (number) => number;

export const formatDate = (date) => new Date(date).toLocaleDateString('pt-br');
export const formatTime = (date) => new Date(date).toLocaleTimeString('pt-br', {timeStyle: 'short'});

export const formatResultType = (type) => {
    switch (type){
        case 'success':
            return ('Prêmio')
        case 'fail':
            return ('Não foi dessa vez')
        case 'retry':
            return ('Tente Novamente')
        default:
            return('Tipo inválido');
    }
}

export const formatPeriodType = (type) => {
    switch (type){
        case 'daily':
            return ('Diariamente')
        case 'weekly':
            return ('Semanalmente')
        case 'monthly':
            return ('Mensalmente')
        case 'yearly':
            return ('Anualmente')
        default:
            return('Período inválido');
    }
}

export const formatLocationFilter = (locationFilter) => locationFilter[0].locationName;

export const formatDateHtml = (date) => {
    return date.toISOString().split('T')[0];
}

export const apiUrl = (method) =>
    `http://${process.env.REACT_APP_API_ADDRESS}:${process.env.REACT_APP_API_PORT}/admin/${method}`;

export const requestHeaders = ({email, pwdHash}) => {
    const headers = new Headers();
    // Base64 encrypt authentication data
    const encoded = base64.encode(`${email}:${pwdHash}`);
    headers.append('Authorization', 'Basic ' + encoded); 
    headers.append('Content-Type', 'application/json');
    
    return headers;
}
  
export const getData = async({method, setter}) => {
    const res = await method();
    console.log(res);
    setter(res);
}
import base64 from 'base-64';

export const formatDouble = (number) => String(Number(number).toFixed(2)).replace('.',',');
export const formatPhone = (number) => number;
export const formatPixKey = (key) => key ? key : 'Não informado';
export const formatDate = (date) => {
    return (new Date(date).toLocaleDateString('pt-br'));
}
export const formatTime = (date) => {
    return (new Date(dateMili).toLocaleTimeString('pt-br', {timeStyle: 'short'}));
}

export const formatResultType = (resultType) => {
    if(resultType === 'success') {
        return 'Prêmio';
    }else if(resultType === 'fail') {
        return 'Não foi dessa vez';
    }else {
        return 'Tente novamente';
    }
}
export const formatOption = (option) => {
    if(option.resultType === 'success') {
        return `R$ ${option.amount}`;
    }else if(option.resultType === 'fail') {
        return 'Nada 🙁';
    }else {
        return '+1 chance';
    }
}

export const formatPeriodType = (type) => {
    switch (type){
        case 'weekly':
            return ('Semanal')
        case 'monthly':
            return ('Mensal')
        default:
            return('Período inválido');
    }
}

export const formatLocationFilter = (locationFilter) => {
    const filter = JSON.parse(locationFilter);
    const estados = filter.states.map(state => state.nome).join(', ');
    const cidades = filter.cities.map(city => city.nome).join(', '); 
    return([estados, cidades]);
};

export const formatDateHtml = (date) => {
    return date.toISOString().split('T')[0];
}

export const apiUrl = ({method, route}) =>
    `${process.env.REACT_APP_API_ADDRESS}${route}${method}`;

export const imgUrl = (imageName) => 
    `${apiUrl({route: '/', method: 'assets'})}/${imageName}`;

export const requestHeaders = ({email, pwdHash}, json=true) => {
    const headers = new Headers();
    // Base64 encrypt authentication data
    const encoded = base64.encode(`${email}:${pwdHash}`);
    headers.append('Authorization', 'Basic ' + encoded);
    headers.append('Access-Control-Allow-Origin', process.env.REACT_APP_API_PORT);
    json && headers.append('Content-Type', 'application/json');
    
    return headers;
}
  
export const getData = async({method, setter}) => {
    const res = await method();
    setter(res);
}

export const showErrors = async (res) => {
    if(!res.ok) {
        const json = await res.json(null);
        const errorMsg = json.errors.reduce((acc, cur) => acc + '\n' + cur.msg,'');
        alert(errorMsg);
    }

    return res.ok;
}
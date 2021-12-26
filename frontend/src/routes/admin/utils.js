const formatDouble = (number) => String(Number(number).toFixed(2)).replace('.',',');
const formatPhone = (number) => number;
const formatPixKey = (number) => number;

const formatDate = (date) => new Date(date).toLocaleDateString('pt-br');
const formatTime = (date) => new Date(date).toLocaleTimeString('pt-br', {timeStyle: 'short'});

const formatResultType = (type) => {
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

const formatPeriodType = (type) => {
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

const formatLocationFilter = (locationFilter) => locationFilter[0].locationName;

const formatDateHtml = (date) => {
    return date.toISOString().split('T')[0];
}

const getStates = async() => {
    const states = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados',{
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return await states;
}

const getCitiesByState = async(stateId) => {
    const cities = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`,{
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return await cities.json();
}

export {formatDouble, formatPhone, formatPixKey, formatDate, formatTime, formatResultType, formatPeriodType, formatLocationFilter, formatDateHtml,getStates,getCitiesByState}
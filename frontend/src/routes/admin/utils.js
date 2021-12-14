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

export {formatDouble, formatPhone, formatPixKey, formatDate, formatTime, formatResultType, formatPeriodType}
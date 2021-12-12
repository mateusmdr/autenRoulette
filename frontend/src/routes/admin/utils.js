const formatDouble = (number) => String(Number(number).toFixed(2)).replace('.',',');
const formatPhone = (number) => number;
const formatPixKey = (number) => number;

const formatDate = (date) => new Date(date).toLocaleDateString('pt-br');
const formatTime = (date) => new Date(date).toLocaleTimeString('pt-br', {timeStyle: 'short'});;

export {formatDouble, formatPhone, formatPixKey, formatDate, formatTime}
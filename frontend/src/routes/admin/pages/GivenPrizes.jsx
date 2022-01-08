import React, {useState} from 'react';

import PaginatedItems from '../components/PaginatedItems';

import {trophy, money, searchIcon} from '../assets';

import Background from '../components/Background';
import Header from '../components/Header';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';

import {formatDouble, formatPhone, formatPixKey, formatDate, formatTime} from '../utils';

const Page = ({setCurrentPage, login}) => {
    const [filter, setFilter] = useState('');

    const cards = {
        givenPrizes: {amount: 120, text: 'Prêmios Entregues'},
        totalGivenAmount: {amount: 'R$ 00000,00', text: 'Total em Prêmios Entregues'},
    }

    const items = new Array(50).fill(
        {name : 'João Alves da Silva Gomes', phone: '(00) 00000-0000', amount: 1231230.3, pixKey: '000.000.000-00', dateTime: '2007-03-01T13:00:00Z',
    paymentDateTime: '2009-04-25T18:30:00Z'}
    );

    const filterRow = (item) => String(item.name + item.phone + `R$ ${formatDouble(item.amount)}` + formatPixKey(item.pixKey) + formatDate(item.dateTime) + formatTime(item.dateTime))
        .toLocaleLowerCase().includes(filter.toLocaleLowerCase());

    const Row = (item, index) => {
        return (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{formatPhone(item.phone)}</td>
                <td>{`R$ ${formatDouble(item.amount)}`}</td>
                <td>{formatPixKey(item.pixKey)}</td>
                <td>{formatDate(item.dateTime)}</td>
                <td>{formatTime(item.dateTime)}</td>
                <td>{formatDate(item.paymentDateTime)}</td>
                <td>{formatTime(item.paymentDateTime)}</td>
            </tr>
        );
    }

    const Table = ({currentItems}) => {
        return(
            <table className='table'>
                <tbody>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Prêmio</th>
                        <th>PIX</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Pagamento</th>
                        <th></th>
                    </tr>
                    {currentItems.map(Row)}
                </tbody>
            </table>
        );
    }

    return (
        <Background id='givenPrizes'>
            <Header setCurrentPage={setCurrentPage}/>
            <main>
                <div className='verticalAlign pageTitle'>
                    <h1>Prêmios Entregues</h1>
                    <SearchBar
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    />
                </div>
                <div className='verticalAlign'>
                    <Card imgSrc={trophy} imgAlt={'Ícone colorido de Troféu'} {...cards.givenPrizes}/>
                    <Card imgSrc={money} imgAlt={'Ícone colorido de dinheiro'} {...cards.totalGivenAmount}/>
                </div>
                <PaginatedItems itemsPerPage={7} TableComponent={Table} items={items.filter(filterRow)}/>
            </main>
        </Background>
    );
}

export default Page;
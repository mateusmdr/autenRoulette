import React, {useState} from 'react';

import PaginatedItems from '../components/PaginatedItems';

import {trophy, money, checkImg, searchIcon} from '../assets';

import Background from '../components/Background';
import Header from '../components/Header';
import Card from '../components/Card';

import {formatDouble, formatPhone, formatPixKey, formatDate, formatTime} from '../utils';

const PendingPrizes = ({setCurrentPage, login}) => {
    const [filter, setFilter] = useState('');

    const cards = {
        pendingPrizes: {amount: 8, text: 'Prêmios Pendentes'},
        totalPendingAmount: {amount: 'R$ 0000,00', text: 'Total em Prêmios Pendentes'},
    }

    const items = new Array(50).fill({name : 'João Alves da Silva Gomes', phone: '(00) 00000-0000', amount: 0, pixKey: '000.000.000-00', dateTime: '2007-03-01T13:00:00Z'});

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
                <td>
                    <button onClick={() => console.log('Confirmar pagamento de id ' + index)}><img src={checkImg} alt='Ícone verde de confirmação'/>Confirmar Pagamento</button>
                </td>
            </tr>
        );
    }

    const Table = ({currentItems}) => {
        return(
            <table className='table'>
                <tbody>
                    <tr><th>Prêmios Pendentes</th></tr>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Prêmio</th>
                        <th>PIX</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Ação</th>
                    </tr>
                    {currentItems.map(Row)}
                </tbody>
            </table>
        );
    }

    return (
        <Background id='pendingPrizes'>
            <Header setCurrentPage={setCurrentPage}/>
            <main>
                <div className='verticalAlign pageTitle'>
                    <h1>Prêmios Pendentes</h1>
                    <div className='relative'>
                        <input 
                            type='text' id='filter' name='filter' placeholder='Pesquise aqui'
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            maxLength={255}
                            required
                        />
                        <img className='inputIcon' src={searchIcon} alt='Ícone de lupa'/>
                    </div>
                </div>
                <div className='verticalAlign'>
                    <Card imgSrc={trophy} imgAlt={'Ícone colorido de Troféu'} {...cards.pendingPrizes}/>
                    <Card imgSrc={money} imgAlt={'Ícone colorido de dinheiro'} {...cards.totalPendingAmount}/>
                </div>
                <PaginatedItems itemsPerPage={6} TableComponent={Table} items={items.filter(filterRow)}/>
            </main>
        </Background>
    );
}

export default PendingPrizes;
import React, {useState, useEffect} from 'react';

import PaginatedItems from '../components/PaginatedItems';

import {trophy, money, checkImg} from '../assets';

import Background from '../components/Background';
import Header from '../components/Header';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';

import {formatDouble, formatPhone, formatPixKey, formatDate, formatTime, getData} from '../utils';

import {getPendingPrizes} from '../queries/get';

const Page = ({setCurrentPage, credentials}) => {
    const [pendingPrizes, setPendingPrizes] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        getData({
            method: () => getPendingPrizes(credentials),
            setter: setPendingPrizes
        });
    },[credentials]);

    const cards = {
        pendingPrizes: {amount: pendingPrizes.length, text: 'Prêmios Pendentes'},
        totalPendingAmount: {
            amount: `R$ ${formatDouble(
                pendingPrizes
                .map(item => item.amount)
                .reduce((acc, cur) => acc + Number(cur),0)
            )}`,
            text: 'Total em Prêmios Pendentes'
        }
    }

    const filterRow = (item) => String(item.name + item.phone + `R$ ${formatDouble(item.amount)}` + formatPixKey(item.pixKey) + formatDate(item.dateTime) + formatTime(item.dateTime))
        .toLocaleLowerCase().includes(filter.toLocaleLowerCase());

    const Row = (item, index) => {
        return (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{formatPhone(item.phone)}</td>
                <td>{`R$ ${formatDouble(item.amount)}`}</td>
                <td>{formatPixKey(item.pixKey)}</td>
                <td>{formatDate(item.winDateTime)}</td>
                <td>{formatTime(item.winDateTime)}</td>
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
                    <SearchBar
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    />
                </div>
                <div className='verticalAlign'>
                    <Card imgSrc={trophy} imgAlt={'Ícone colorido de Troféu'} {...cards.pendingPrizes}/>
                    <Card imgSrc={money} imgAlt={'Ícone colorido de dinheiro'} {...cards.totalPendingAmount}/>
                </div>
                <PaginatedItems itemsPerPage={7} TableComponent={Table} items={pendingPrizes.filter(filterRow)}/>
            </main>
        </Background>
    );
}

export default Page;
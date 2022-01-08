import React from 'react';

import PaginatedItems from '../components/PaginatedItems';

import {trophy, coloredUser, flag, checkImg} from '../assets';

import Background from '../components/Background';
import Header from '../components/Header';
import Card from '../components/Card';

import {formatDouble, formatPhone, formatPixKey, formatDate, formatTime} from '../utils';

const Page = ({setCurrentPage, credentials}) => {
    const cards = {
        pendingPrizes: {amount: 8, text: 'Prêmios Pendentes'},
        publishedAds: {amount: 10, text: 'Prêmios Pendentes'},
        registeredUsers: {amount: 1032, text: 'Usuários Cadastrados'},
    }

    const items = new Array(50).fill({name : 'João Alves da Silva Gomes', phone: '(00) 00000-0000', amount: 0, pixKey: '000.000.000-00', dateTime: '2007-03-01T13:00:00Z'});

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
        <Background id='home'>
            <Header setCurrentPage={setCurrentPage}/>
            <main>
                <div className='verticalAlign'>
                    <Card imgSrc={trophy} imgAlt={'Ícone colorido de Troféu'} {...cards.pendingPrizes}/>
                    <Card imgSrc={flag} imgAlt={'Ícone colorido de flag'} {...cards.publishedAds}/>
                    <Card imgSrc={coloredUser} imgAlt={'Ícone colorido de usuário'} {...cards.registeredUsers}/>
                </div>
                <PaginatedItems itemsPerPage={7} TableComponent={Table} items={items}/>
            </main>
        </Background>
    );
}

export default Page;
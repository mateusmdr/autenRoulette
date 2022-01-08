import React, { useEffect, useState } from 'react';

import PaginatedItems from '../components/PaginatedItems';

import {trophy, coloredUser, flag, checkImg} from '../assets';

import Background from '../components/Background';
import Header from '../components/Header';
import Card from '../components/Card';

import {formatDouble, formatPhone, formatPixKey, formatDate, formatTime, getData} from '../utils';
import { getAdCount, getPendingPrizes, getUserCount } from '../queries/get';

const Page = ({setCurrentPage, credentials}) => {
    const [pendingPrizes, setPendingPrizes] = useState([]);
    const [adCount, setAdCount] = useState(null);
    const [userCount, setUserCount] = useState(null);

    useEffect(() => {
        getData({
            method: () => getPendingPrizes(credentials),
            setter: setPendingPrizes
        });
        getData({
            method: () => getAdCount(credentials),
            setter: setAdCount
        });
        getData({
            method: () => getUserCount(credentials),
            setter: setUserCount
        });
    },[]);


    const cards = {
        pendingPrizes: {amount: pendingPrizes.length, text: 'Prêmios Pendentes'},
        publishedAds: {amount: adCount, text: 'Anúncios Publicados'},
        registeredUsers: {amount: userCount, text: 'Usuários Cadastrados'},
    }

    const Row = (item, index) => {
        console.log(item, adCount, userCount);
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
                <PaginatedItems itemsPerPage={7} TableComponent={Table} items={pendingPrizes}/>
            </main>
        </Background>
    );
}

export default Page;
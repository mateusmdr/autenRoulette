import React, {useState} from 'react';

import '../styles/Users.css';

import PaginatedItems from '../components/PaginatedItems';

import {coloredUser} from '../assets';

import Background from '../components/Background';
import Header from '../components/Header';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';

import {formatDouble, formatPhone, formatPixKey, formatDate, formatTime} from '../utils';

const Page = ({setCurrentPage, credentials}) => {
    const [filter, setFilter] = useState('');

    const cards = {
        registeredUsers: {amount: 1032, text: 'Usuários Cadastrados'},
    }

    const items = new Array(100).fill(
        {name : 'João Alves da Silva Gomes', phone: '(00) 00000-0000'}
    );

    const filterRow = (item) => String(item.name + item.phone + `R$ ${formatDouble(item.amount)}` + formatPixKey(item.pixKey) + formatDate(item.dateTime) + formatTime(item.dateTime))
        .toLocaleLowerCase().includes(filter.toLocaleLowerCase());

    const Row = (item, index) => {
        return (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{formatPhone(item.phone)}</td>
            </tr>
        );
    }

    const Tables = ({currentItems}) => {
        return(
            <div className='verticalAlign tableContainer'>
                <table className='table'>
                    <tbody>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                        </tr>
                        {currentItems.filter((el, index) => index % 2 === 0).map(Row)}
                    </tbody>
                </table>
                <table className='table'>
                    <tbody>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                        </tr>
                        {currentItems.filter((el, index) => index % 2 !== 0).map(Row)}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <Background id='users'>
            <Header setCurrentPage={setCurrentPage}/>
            <main>
                <div className='verticalAlign pageTitle'>
                    <h1>Usuários Cadastrados</h1>
                    <SearchBar
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    />
                </div>
                <div className='verticalAlign'>
                    <Card imgSrc={coloredUser} imgAlt={'Ícone colorido de Usuário'} {...cards.registeredUsers}/>
                </div>
                <PaginatedItems itemsPerPage={14} TableComponent={Tables} items={items.filter(filterRow)}/>
            </main>
        </Background>
    );
}

export default Page;
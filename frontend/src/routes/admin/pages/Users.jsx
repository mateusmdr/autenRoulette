import React, {useState, useEffect} from 'react';

import '../styles/Users.css';

import PaginatedItems from '../components/PaginatedItems';

import {coloredUser} from '../assets';

import Background from '../components/Background';
import Header from '../components/Header';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';

import {formatDouble, formatPhone, formatPixKey, formatDate, formatTime, getData} from '../utils';
import {getUsers} from '../queries/get';

const Page = ({setCurrentPage, credentials}) => {
    const [filter, setFilter] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getData({
            method: () => getUsers(credentials),
            setter: setUsers
        });
    },[credentials]);

    const cards = {
        registeredUsers: {amount: users.length, text: 'Usuários Cadastrados'},
    }

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
                        {currentItems.filter((el, index) => index < 7).map(Row)}
                    </tbody>
                </table>
                {currentItems.length > 7 && 
                    <table className='table'>
                        <tbody>
                            <tr>
                                <th>Nome</th>
                                <th>Telefone</th>
                            </tr>
                            {currentItems.filter((el, index) => index >= 7).map(Row)}
                        </tbody>
                    </table>
                }
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
                <PaginatedItems itemsPerPage={14} TableComponent={Tables} items={users.filter(filterRow)}/>
            </main>
        </Background>
    );
}

export default Page;
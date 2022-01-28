import React, { useEffect, useState } from 'react';
import {Modal} from '@mui/material';

import PaginatedItems from '../components/PaginatedItems';

import {trophy, coloredUser, flag, checkImg} from '../assets';

import Background from '../components/Background';
import Header from '../components/Header';
import Card from '../components/Card';

import {formatDouble, formatPhone, formatPixKey, formatDate, formatTime, getData, formatDateHtml} from '../utils';
import { getAdCount, getPendingPrizes, getUserCount } from '../queries/get';
import {confirmPayment} from '../queries/put';

const Page = ({setCurrentPage, credentials}) => {    
    const [pendingPrizes, setPendingPrizes] = useState([]);
    const [adCount, setAdCount] = useState(null);
    const [userCount, setUserCount] = useState(null);

    const today = new Date();
    const [modalPopup, setModalPopup] = useState(false);
    const [selectedPrize, setSelectedPrize] = useState(null);
    const [input, setInput] = useState({paymentDate: today});

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
    },[credentials]);


    const cards = {
        pendingPrizes: {amount: pendingPrizes.length, text: 'Prêmios Pendentes'},
        publishedAds: {amount: adCount, text: 'Anúncios Publicados'},
        registeredUsers: {amount: userCount, text: 'Usuários Cadastrados'},
    }

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
                    <button onClick={() => {
                        setSelectedPrize(item);
                        setModalPopup(true);
                    }}>
                        <img src={checkImg} alt='Ícone verde de confirmação'/>
                        Confirmar Pagamento
                    </button>
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
        <Background>
            <Header setCurrentPage={setCurrentPage}/>
            <main>
                <div className='verticalAlign'>
                    <Card imgSrc={trophy} imgAlt={'Ícone colorido de Troféu'} {...cards.pendingPrizes}/>
                    <Card imgSrc={flag} imgAlt={'Ícone colorido de flag'} {...cards.publishedAds}/>
                    <Card imgSrc={coloredUser} imgAlt={'Ícone colorido de usuário'} {...cards.registeredUsers}/>
                </div>
                <PaginatedItems itemsPerPage={7} TableComponent={Table} items={pendingPrizes}/>
            </main>
            <Modal
                open={modalPopup}
                onClose={() => setModalPopup(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description">
                <div
                    className="modal-box"
                >
                    <h2 id="modal-title">Confirmar Pagamento</h2>
                    <div id="modal-description">
                        <h2 className='bold'>Chave Pix: </h2><span> {selectedPrize?.pixKey}</span>
                    </div>
                    <div>
                        <label htmlFor="paymentDate">Data de Pagamento:</label>
                        <div className='field'>
                            <input 
                                type='date' id='paymentDate' name='paymentDate'
                                max={formatDateHtml(today)}
                                value={formatDateHtml(input.paymentDate)}
                                onChange={e => setInput({...input, paymentDate: new Date(e.target.value)})}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className='formActions'>
                        <input className='cancel' type='submit' value='Cancelar'
                            onClick={() => setModalPopup(false)}
                        />
                        <input type='submit' value='Confirmar'
                            onClick={async () => {
                                const res = await confirmPayment({...credentials, id: selectedPrize?.id, paymentDateTime: input.paymentDate.toISOString()});
                                if(res)
                                    setModalPopup(false);
                            }}
                        />
                    </div>
                </div>
            </Modal>
        </Background>
    );
}

export default Page;
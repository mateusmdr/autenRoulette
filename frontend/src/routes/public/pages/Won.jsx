import React from 'react';

import {gift} from './assets/export';
import '../styles/Roulette.css';

import AdBackground from './components/AdBackground';

const Won = ({login, setCurrentPage, amount, user}) => {    
    return (
        <AdBackground login={login} user={user}>
            <div id='won' className='column'>
                <h2>Oba, você ganhou!</h2>
                <div className='row'>
                    <img src={gift} alt='Presente colorido e moedas douradas'/>
                </div>
                <h1>{amount}</h1>
                <h3>O dinheiro será transferido para a sua conta via pix.</h3>
                <div className='row'>
                    <input 
                        type='submit' value='Informar Chave PIX'
                        onClick={() => {
                            setCurrentPage('key');
                        }}
                    />
                </div>
            </div>
        </AdBackground>
    );
}

export default Won;
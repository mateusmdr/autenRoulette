import React from 'react';

import '../styles/Roulette.css';

import {success as successImg} from './assets/export';

import AdBackground from './components/AdBackground';

const Success = ({login, setCurrentPage}) => {
    return (
        <AdBackground login={login}>
            <div id='success' className='column'>
                <h2>Fique de olho!</h2>
                <div className='row'>
                    <img src={successImg} alt='Símbolo de correto, bem-sucedido'/>
                </div>
                <h3>O dinheiro será transferido para a sua conta em breve.</h3>
                <div className='spacer'></div>
                <div className='row'>
                    <input 
                        type='submit' value='Concluir'
                        onClick={() => {
                            setCurrentPage('home');
                        }}
                    />
                </div>
            </div>
        </AdBackground>
    );
}

export default Success;
import React from 'react';

import {failure as failureImg} from './assets/export';
import '../styles/Roulette.css';

import AdBackground from './components/AdBackground';

const Failure = ({login, setCurrentPage, user, ads}) => {
    return (
        <AdBackground login={login} user={user} ads={ads}>
            <div id='failure' className='column'>
                <h2>Que pena, não foi dessa vez!</h2>
                <div className='row'>
                    <img src={failureImg} alt='Polegar para baixo'/>
                </div>
                <h3>Você pode tentar a sorte novamente amanhã.</h3>
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

export default Failure;
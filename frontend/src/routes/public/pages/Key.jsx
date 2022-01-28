import React, {useState} from 'react';

import {key as keyImg} from './assets/export';
import '../styles/Roulette.css';

import AdBackground from './components/AdBackground';

import {setPixKey} from '../queries/put';

const Key = ({login, setCurrentPage, user, ads}) => {
    const [keyInput, setKeyInput] = useState('');
    return (
        <AdBackground login={login} user={user} ads={ads}>
            <div id='key' className='column'>
                <h2>Receba a transferência do prêmio por meio do PIX</h2>
                <div className='row'>
                    <img src={keyImg} alt='Chave'/>
                </div>
                <form>
                    <label htmlFor='key'>Chave do PIX</label>
                    <div className='field'>
                        <input 
                            type='text' id='key' name='key' placeholder='Chave'
                            value={keyInput}
                            onChange={e => setKeyInput(e.target.value)}
                            required
                        />
                        <h4 htmlFor='key'>CPF, CNPJ, Telefone, Chave Aleatória</h4>
                    </div>                    
                    <div className='row'>
                        <input 
                            type='submit' value='Informar Chave PIX'
                            onClick={async (e) => {
                                e.preventDefault();
                                const res = await setPixKey({pixKey: keyInput});
                                console.log({res});
                                if(res)
                                    setCurrentPage('success');
                            }}
                        />
                    </div>
                </form>
            </div>
        </AdBackground>
    );
}

export default Key;
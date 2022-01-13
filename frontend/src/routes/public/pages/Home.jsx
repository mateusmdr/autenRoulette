import React, {useState, useEffect} from "react";

import Background from './components/Background';

import {personIcon, phoneIcon, bottomLeftCoins, bottomRightLights} from './assets/export';

const Home = ({setCurrentPage, setLogin}) => {
    useEffect(() => import('../styles/Home.css'));

    const [input, setInput] = useState({name: '', phone: '', remember: false});
    return (
        <Background id='home'>
            <h1 id='title'>TENTA A SORTE</h1>
            <hgroup>
                <h3>Concorra a prêmio em dinheiro ao girar a roleta.</h3>
                <h3>Você pode girar a roleta <span className='bold'>uma vez ao dia</span></h3>
            </hgroup>
            <form>
                <label htmlFor='name'>Nome</label>
                <div className='field'>
                    <input 
                        type='text' id='name' name='name' placeholder='Seu nome'
                        value={input.name}
                        onChange={e => setInput({...input, name: e.target.value})}
                        maxLength={255}
                        required
                    />
                    <img className='inputIcon' src={personIcon} alt='Ícone de usuário'/>
                </div>
                <label htmlFor='phone'>Telefone</label>
                <div className='field'>
                    <input 
                        type='text' id='phone' name='phone' placeholder='(00) 00000-0000'
                        value={input.phone}
                        onChange={e => setInput({...input, phone: e.target.value})}
                        maxLength={15}
                        required
                    />
                    <img className='inputIcon' src={phoneIcon} alt='Ícone de telefone'/>
                </div>
                <div className='field'>
                    <input 
                        type='checkbox' id='remember' name='remember' 
                        value={input.remember}
                        onClick={() => setInput({...input, remember: !input.remember})}
                    />
                    <label htmlFor='remember'>Lembrar de mim</label>
                </div>
                <div className='row'>
                    <input 
                        type='submit' value='Girar Roleta'
                        onClick={() => {
                            setLogin(input);
                            setCurrentPage('roulette');
                        }}
                    />
                </div>
            </form>
            <img className='bottomLeftCoins' src={bottomLeftCoins} alt='Moedas douradas'/>
            <img className='bottomRightLights' src={bottomRightLights} alt='Arco de luzes brancas'/>
        </Background>
    );
}

export default Home;
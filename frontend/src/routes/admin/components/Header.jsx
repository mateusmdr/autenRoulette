import React, {useState} from 'react'

import {headerCoins, arrowDown, arrowUp} from '../assets';
import '../styles/Header.css';

const Component = ({setCurrentPage}) => {    
    const [selectPopUp, setSelectPopUp] = useState(false);
    const [displayTimeout, setDisplayTimeout] = useState(null);

    const toggleSelectPopUp = () => {
        clearTimeout(displayTimeout);
        if (!selectPopUp) {
            document.getElementById('selectPopUp').style.display = 'flex';
        }else{
            setDisplayTimeout(
                setTimeout(() => {
                    document.getElementById('selectPopUp').style.display = 'none';
                }, 1000)
            );
        }
        
        setTimeout(() => setSelectPopUp(!selectPopUp),0);
    }

    return (
        <header className='verticalAlign spaceBetween'>
            <div className='verticalAlign'>
                <hgroup>
                    <h1 id='title'>TENTA A SORTE</h1>
                    <div>
                        <h3>Portal Administrativo</h3>
                    </div>
                </hgroup>
                <img src={headerCoins} alt='Moedas douradas' className='flexEnd'/>
            </div>        
            <nav className='verticalAlign spaceBetween'>
                <button onClick={() => setCurrentPage('home')}>Home</button>
                <div className='relative'>
                    <button onClick={toggleSelectPopUp} className='dropdown verticalAlign'>
                        <label>Prêmios</label>
                        <img src={selectPopUp ? arrowDown : arrowUp} alt='Seta indicando caixa de seleção'/>
                    </button>
                    <ul id='selectPopUp' className={`${selectPopUp ? 'popup-shown' : 'popup-hidden'}`}>
                        <li onClick={() => setCurrentPage('availablePrizes')}>Cadastrados</li>
                        <li onClick={() => setCurrentPage('pendingPrizes')}>Pendentes</li>
                        <li onClick={() => setCurrentPage('givenPrizes')}>Entregues</li>
                        <li onClick={() => setCurrentPage('updateProbability')}>Probabilidade</li>
                    </ul>
                </div>
                <button onClick={() => setCurrentPage('ads')}>Anúncios</button>
                <button onClick={() => setCurrentPage('users')}>Usuários</button>
            </nav>
        </header>
    );
}

export default Component;
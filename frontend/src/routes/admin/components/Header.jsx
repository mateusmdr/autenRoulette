import React, {useState, useEffect} from 'react'

import {headerCoins, arrowDown, arrowUp} from '../assets';

const Header = ({setCurrentPage}) => {
    useEffect(() => import('../styles/Header.css'));

    const [selectPopUp, setSelectPopUp] = useState(false);
    const [displayPopUp, setDisplayPopUp] = useState(false);

    const toggleSelectPopUp = () => {
        setSelectPopUp(!selectPopUp);
        setTimeout(() => {
            setDisplayPopUp(selectPopUp ? 'hide' : false)
        },1000)
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
                    <ul className={'selectPopUp' + (displayPopUp==='hide' ? ' hide' : '')} style={{opacity: selectPopUp ? 1 : 0}}>
                        <li onClick={() => setCurrentPage('registeredPrizes')}>Cadastrados</li>
                        <li onClick={() => setCurrentPage('pendingPrizes')}>Pendentes</li>
                        <li onClick={() => setCurrentPage('givenPrizes')}>Entregues</li>
                    </ul>
                </div>
                <button onClick={() => setCurrentPage('ads')}>Anúncios</button>
                <button onClick={() => setCurrentPage('users')}>Usuários</button>
            </nav>
        </header>
    );
}

export default Header;
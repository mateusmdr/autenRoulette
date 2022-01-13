import React, {useEffect} from "react";

import Background from './Background';

import {ad1, ad2} from '../assets/export';

const AdBackground = ({children, login}) => {
    useEffect(() => import('../../styles/AdBackground.css'));
    
    return (
        <Background id={'adbackground'}>
            <header>
                <h3>TENTA A SORTE</h3>
                <div className='username'>
                    <h2>{login.name}</h2>
                </div>
            </header>
            <aside>
                <img className='ad' src={ad1} alt='Anúncio superior'/>
            </aside>
            {children}
            <aside>
                <img className='ad' src={ad2} alt='Anúncio inferior'/>
            </aside>
        </Background>
    )
}

export default AdBackground;
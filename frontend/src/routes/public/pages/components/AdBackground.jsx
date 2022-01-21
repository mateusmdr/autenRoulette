import React from "react";

import Background from './Background';

import {ad1, ad2} from '../assets/export';
import '../../styles/AdBackground.css';

const AdBackground = ({children, user}) => {
    
    return (
        <Background id={'adbackground'}>
            <div className="header">
                <h3>TENTA A SORTE</h3>
                <div className='username'>
                    <h2>{user.name}</h2>
                </div>
            </div>
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
import React from "react";

import Background from './Background';

import '../../styles/AdBackground.css';

const AdBackground = ({children, user, ads}) => {
    return (
        <Background id={'adbackground'}>
            <div className="header">
                <h3>TENTA A SORTE</h3>
                <div className='username'>
                    <h2>{user.name}</h2>
                </div>
            </div>
            {ads.length === 2 && <figure>
                <a href={ads[0].linkURL} target='_blank' rel="noopener noreferrer">
                    <img className='ad' src={ads[0].imgPath} alt='Anúncio superior'/>
                    <figcaption>Anúncio</figcaption>
                </a>
            </figure>}
            {children}
            {ads.length === 2 &&<figure>
                <a href={ads[1].linkURL} target='_blank' rel="noopener noreferrer">
                    <img className='ad' src={ads[1].imgPath} alt='Anúncio inferior'/>
                    <figcaption>Anúncio</figcaption>
                </a>
            </figure>}
        </Background>
    )
}

export default AdBackground;
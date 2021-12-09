import React, { useState } from 'react';

import '../styles/Roulette.css';

import Background from './components/Background';

import { outerRoulette, innerRoulette, rouletteBackground, ad1, ad2 , rouletteBackgroundCoins} from './assets/export';

const Roulette = ({login}) => {
    const values = [
        {displayText: 'R$ 5.000'},
        {displayText: 'R$ 5.000'},
        {displayText: 'R$ 5.000'},
        {displayText: 'R$ 5.000'},
        {displayText: 'R$ 5.000'},
        {displayText: 'R$ 5.000'},
        {displayText: 'R$ 5.000'},
        {displayText: 'R$ 5.000'},
        {displayText: 'R$ 5.000'},
        {displayText: 'R$ 5.000'},
        {displayText: 'R$ 5.000'},
        {displayText: 'R$ 5.000'},
    ];

    const [isSpinning, setSpinning] = useState(false);
    return (
        <Background id='spin'>
            <div className='background'>
                <img src={rouletteBackgroundCoins} alt='Moedas de plano de fundo'/>
            </div>
            <header>
                <h3>TENTA A SORTE</h3>
                <div className='username'>
                    <h2>{login.name}</h2>
                </div>
            </header>
            <aside>
                <img className='ad' src={ad1} alt='Anúncio superior'/>
            </aside>
            <div id='roulette'>
                <img className='outer' src={outerRoulette} alt='Círculo de luzes brancas ao redor da roleta'/>
                <div className='inner'>
                    <img src={innerRoulette} alt='Círculo central da roleta'/>
                    <button onClick={()=> setSpinning(true)}>{isSpinning ? null : 'GIRAR'}</button>
                </div>
                <div id='segments' style={isSpinning ? {'animationPlayState': 'running'}:{'animationPlayState': 'paused'}}>
                    <img src={rouletteBackground} alt='Plano de fundo da roleta'/>
                    {values.map((value, index) => {
                        const deg = (index * 360/12 - 90) % 360;
                        const segmentStyle = {
                            transform: 'translate(-50%,-50%) rotateZ('+ deg + 'deg)'
                        };
                        return (
                            <div style={segmentStyle} className='segment' key={index}>
                                <h2>{value.displayText}</h2>
                            </div>
                        );
                    })} 
                </div>
            </div>
            <p>
                Concorra a prêmio em dinheiro ao girar a roleta
                Você pode girar a roleta <span className='bold'>uma vez ao dia</span>
            </p>
            <aside>
                <img className='ad' src={ad2} alt='Anúncio inferior'/>
            </aside>
        </Background>
    );
}

export default Roulette;
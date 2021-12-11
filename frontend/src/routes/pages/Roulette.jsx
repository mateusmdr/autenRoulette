import React, { useState, useEffect } from 'react';

import AdBackground from './components/AdBackground';

import { outerRoulette, innerRoulette, rouletteBackground, rouletteBackgroundCoins} from './assets/export';

const Roulette = ({login, setCurrentPage}) => {
    useEffect(() => import('../styles/Roulette.css'));
    
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
        <AdBackground login={login}>
            <div className='background'>
                <img src={rouletteBackgroundCoins} alt='Moedas de plano de fundo'/>
            </div>
            <div id='roulette'>
                <img className='outer' src={outerRoulette} alt='Círculo de luzes brancas ao redor da roleta'/>
                <div className='inner'>
                    <img src={innerRoulette} alt='Círculo central da roleta'/>
                    <button onClick={()=> {
                        setSpinning(true);
                        setTimeout(() => setCurrentPage('failure'), 2000);
                    }}>{isSpinning ? null : 'GIRAR'}</button>
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
        </AdBackground>
    );
}

export default Roulette;
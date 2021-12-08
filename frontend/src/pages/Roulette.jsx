import React, { useState } from 'react';

import '../styles/Roulette.css';

import Background from './components/Background';

import { outerRoulette, innerRoulette, rouletteBackground } from './assets/export';

const Roulette = (props) => {
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
            <div id='roulette'>
                <img className='outer' src={outerRoulette} alt='Círculo de luzes brancas ao redor da roleta'/>
                <div className='inner'>
                    <img src={innerRoulette} alt='Círculo central da roleta'/>
                    <button id='spin' onClick={()=> setSpinning(true)}>{isSpinning ? $('#segments').attr('width') : 'GIRAR'}</button>
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
        </Background>
    );
}

export default Roulette;
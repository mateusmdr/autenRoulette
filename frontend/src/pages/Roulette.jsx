import React from 'react';

import '../styles/Roulette.css';

import Background from './components/Background';

import { outerRoulette, innerRoulette } from './assets/export';

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
    return (
        <Background id='spin'>
            <div id='roulette'>
                <img className='outer' src={outerRoulette} alt='Círculo de luzes brancas ao redor da roleta'/>
                <div className='inner'>
                    <img src={innerRoulette} alt='Círculo central da roleta'/>
                    <button id='spin' onClick={()=> alert('girando!')}>GIRAR</button>
                </div>
                <div className='segments'>
                    {values.map((value, index) => {
                        const bgcolor = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
                        const deg = (index * 360/12 - 90) % 360;
                        const segmentStyle = {
                            transform: 'translate(calc(32/360 * 50vw), calc(32/360 * 50vw)) rotateZ('+ deg + 'deg)',
                            backgroundColor: bgcolor
                        };
                        return (
                            <div style={segmentStyle} className='segment'>
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
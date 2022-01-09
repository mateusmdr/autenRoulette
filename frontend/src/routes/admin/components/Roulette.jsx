import React from 'react';
import '../styles/Roulette.css';

import { innerRoulette, outerRoulette, rouletteBackground } from '../assets';
import { formatResultType } from '../utils';

const Component = ({values}) => {
    return (
        <div id='roulette'>
            <img className='outer' src={outerRoulette} alt='Círculo de luzes brancas ao redor da roleta'/>
            <div className='inner'>
                <img src={innerRoulette} alt='Círculo central da roleta'/>
            </div>
            <div id='segments'>
                <img src={rouletteBackground} alt='Plano de fundo da roleta'/>
                {values.map((item,index) => {
                    const deg = (item.position * 360/12 - 90) % 360;
                    const segmentStyle = {
                        transform: 'translate(-50%,-50%) rotateZ('+ deg + 'deg)'
                    };
                    return (
                        <div style={segmentStyle} className='segment' key={index}>
                            <h2>{item.resultType === 'success' ? `R$ ${item.amount}` : formatResultType(item.resultType)}</h2>
                        </div>
                    );
                })} 
            </div>
        </div>
    );
}

export default Component;
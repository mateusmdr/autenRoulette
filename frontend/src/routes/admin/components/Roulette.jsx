import React, { useEffect } from 'react';

import { innerRoulette, outerRoulette, rouletteBackground } from '../assets';
import { formatResultType } from '../utils';

const Component = ({values}) => {
    useEffect(() => import('../styles/Roulette.css'));
    return (
        <div id='roulette'>
            <img className='outer' src={outerRoulette} alt='Círculo de luzes brancas ao redor da roleta'/>
            <div className='inner'>
                <img src={innerRoulette} alt='Círculo central da roleta'/>
            </div>
            <div id='segments'>
                <img src={rouletteBackground} alt='Plano de fundo da roleta'/>
                {values.map((item) => {
                    const deg = (item.position * 360/12 - 90) % 360;
                    const segmentStyle = {
                        transform: 'translate(-50%,-50%) rotateZ('+ deg + 'deg)'
                    };
                    return (
                        <div style={segmentStyle} className='segment' key={item.position}>
                            <h2>{item.resultType === 'success' ? `R$ ${item.amount}` : formatResultType(item.resultType)}</h2>
                        </div>
                    );
                })} 
            </div>
        </div>
    );
}

export default Component;
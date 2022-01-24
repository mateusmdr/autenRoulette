import React, { useState, useEffect } from 'react';

import AdBackground from './components/AdBackground';

import { outerRoulette, innerRoulette, rouletteBackground, rouletteBackgroundCoins} from './assets/export';
import '../styles/Roulette.css';

import {getAvailablePrizes} from '../queries/get';
import { generateDrawnOption } from '../queries/post';

import { getData, formatOption } from '../utils';

const Roulette = ({user, setCurrentPage, setAmount, ads}) => {

    const [options, setOptions] = useState([]);

    const [isSpinning, setSpinning] = useState(false);

    useEffect(() => {
        getData({
            method: () => getAvailablePrizes(),
            setter: setOptions,
        });
    },[])
    

    return (
        <AdBackground user={user} ads={ads}>
            <div className='roulette'>
                <img className='backgroundCoins' src={rouletteBackgroundCoins} alt='Moedas de plano de fundo'/>
                <img className='outer' src={outerRoulette} alt='Círculo de luzes brancas ao redor da roleta'/>
                <div className='inner'>
                    <img src={innerRoulette} alt='Círculo central da roleta'/>
                    <button onClick={async ()=> {
                        const {json, ok} = await generateDrawnOption();
                        if(ok){
                            setSpinning(true);
                            console.log({drawnOption: json})
                            if(json.resultType === 'fail'){
                                setTimeout(() => setCurrentPage('failure'), 1500);
                            }else if(json.resultType === 'success') {
                                setAmount(json.amount);
                                setTimeout(() => setCurrentPage('won'), 1500);
                            }else {
                                setTimeout(() => setSpinning(false), 1500);
                            }
                        }else {
                            setCurrentPage('home');
                        }
                    }}
                        disabled={isSpinning}
                    >{isSpinning ? null : 'GIRAR'}</button>
                </div>
                <div id='segments' style={isSpinning ? {'animationPlayState': 'running'}:{'animationPlayState': 'paused'}}>
                    <img src={rouletteBackground} alt='Plano de fundo da roleta'/>
                    {options.map((option, index) => {
                        const deg = (index * 360/12 - 90) % 360;
                        const segmentStyle = {
                            transform: 'translate(-50%,-50%) rotateZ('+ deg + 'deg)'
                        };
                        return (
                            <div style={segmentStyle} className='segment' key={index}>
                                <h2>{formatOption(option)}</h2>
                            </div>
                        );
                    })}
                </div>
            </div>
            <p>
                Concorra a prêmios em dinheiro ao girar a roleta.
                Você pode girar a roleta <span className='bold'>uma vez ao dia</span>
            </p>
        </AdBackground>
    );
}

export default Roulette;
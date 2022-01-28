import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';

import AdBackground from './components/AdBackground';

import {
    outerRoulette, innerRoulette, rouletteBackground,
    rouletteBackgroundCoins, rouletteTip,
    spinningRoulette, won, lost
}from './assets/export';

import '../styles/Roulette.css';

import {getAvailablePrizes} from '../queries/get';
import { generateDrawnOption } from '../queries/post';

import { getData, formatOption } from '../utils';

const Roulette = ({user, setCurrentPage, setAmount, ads}) => {

    const [options, setOptions] = useState([]);
    const [drawnOption, setDrawnOption] = useState({});
    const [isSpinning, setSpinning] = useState(false);

    const [playSpinning, {stop}] = useSound(spinningRoulette);

    const [playWon] = useSound(won);
    const [playLost] = useSound(lost);

    useEffect(() => {
        getData({
            method: () => getAvailablePrizes(),
            setter: setOptions,
        });
    },[]);

    const optionIndex = options.findIndex(el => el.id === drawnOption.id);
    
    const animation = {
        'animationName': 'option' + (11-optionIndex),
    }

    return (
        <AdBackground user={user} ads={ads}>
            <div className='roulette'>
                <img className='backgroundCoins' src={rouletteBackgroundCoins} alt='Moedas de plano de fundo'/>
                <img className='outer' src={outerRoulette} alt='Círculo de luzes brancas ao redor da roleta'/>
                <div className='inner'>
                    <img src={innerRoulette} alt='Círculo central da roleta'/>
                    <img id='tip' src={rouletteTip} alt='Ponteiro da roleta'/>
                    <button onClick={async ()=> {
                        const {json, ok} = await generateDrawnOption();
                        if(ok){
                            playSpinning();
                            setDrawnOption(json);
                            console.log(json);
                            setSpinning(true);
                            setTimeout(() => {
                                if(json.resultType === 'fail'){
                                    playLost();
                                    setCurrentPage('failure');
                                }else if(json.resultType === 'success') {
                                    setAmount(json.amount);
                                    playWon();
                                    setCurrentPage('won');
                                }else {
                                    setSpinning(false);
                                }
                                stop();
                            },3200);
                        }else {
                            setCurrentPage('home');
                        }
                    }}
                        disabled={isSpinning}
                    >{isSpinning ? null : 'GIRAR'}</button>
                </div>
                <div id='segments' style={{...animation, 'animationPlayState': (isSpinning ? 'running' : 'paused')}}>
                    <img src={rouletteBackground} alt='Plano de fundo da roleta'/>
                    {options.map((option, index) => {
                        const deg = (index * 360/12 - 90) % 360;
                        const segmentStyle = {
                            transform: 'translate(-50%,-50%) rotateZ('+ deg + 'deg)'
                        };
                        return (
                            <div style={segmentStyle} className='segment' key={index}>
                                {formatOption(option)}
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
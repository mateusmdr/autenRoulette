import React, {useState, useEffect} from 'react';

import Background from '../components/Background';
import Header from '../components/Header';

import {getData} from '../utils';

import {getProbability} from '../queries/get';
import {updateProbability} from '../queries/put';

const Page = ({setCurrentPage, credentials}) => {
    const [probability, setProbability] = useState(null);
    const [input, setInput] = useState(0);

    const handleInput = (value) => {
        if(value > 100)
            return setInput(100);
        
        if (value < 0)
            return setInput(0);
        
        return setInput(Number.parseFloat(value));
    }

    useEffect(() => {
        getData({
            method: () => getProbability(credentials),
            setter: (value) => {
                setProbability(value);
                setInput(value*100);
            }
        });
    },[credentials]);

    return (
        <Background id='pendingPrizes'>
            <Header setCurrentPage={setCurrentPage}/>
            <main>
                <div className='verticalAlign pageTitle'>
                    <h1>Editar probabilidade geral de prêmio</h1>
                </div>
                <h2>Probabilidade atual: {probability*100}%</h2>
                <div className='horizontalAlign smallGap'>
                    <label htmlFor='probability'>Nova probabilidade</label>
                    <div className='field probability'>
                        <input 
                            type='number'
                            id='probability'
                            value={input}
                            onChange={(e) => handleInput(e.target.value)}
                            min={0}
                            max={100}
                        />
                        <label className='inputIcon'>%</label>
                    </div>
                    <input 
                        type='submit'
                        style={{marginTop: 0}}
                        value='Atualizar'
                        onClick={async () => {
                            const res = await updateProbability({...credentials, probability: input/100});
                            
                            if(res) {
                                getData({
                                    method: () => getProbability(credentials),
                                    setter: (value) => {
                                        setProbability(value);
                                        setInput(value*100);
                                    }
                                });
                            }
                        }}
                    />
                </div>
            </main>
        </Background>
    );
}

export default Page;
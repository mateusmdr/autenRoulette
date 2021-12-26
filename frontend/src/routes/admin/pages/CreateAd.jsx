import React, {useEffect, useState} from 'react';

import {flag, radio, linkIcon} from '../assets';

import Background from '../components/Background';
import Header from '../components/Header';

import {formatDateHtml, getStates, getCitiesByState} from '../utils';

import '../styles/CreateAd.css';

const StageImg = ({stageNumber, formStage}) => {
    return(formStage === stageNumber ? (
        <img src={radio.radioCurrent} alt='Círculo indicando o estágio atual'/>
    ) : formStage > stageNumber ? (
        <img src={radio.radioComplete} alt='Círculo indicando um estágio já preenchido'/>
    ) : (
        <img src={radio.radioDefault} alt='Círculo indicando um estágio a preencher'/>
    ));
}

const Form = ({selectedAd, setCurrentPage}) => {
    const today = new Date();

    const [input, setInput] = useState({
        companyName: '', initialDate: today, expirationDate: new Date(Date.now().valueOf() + 86400000), linkUrl : '',
        state: '', city: ''
    });
    const [stage, setStage] = useState(0);

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(async () => {
        const availableStates = await getCitiesByState();
        console.log(availableStates);
        setStates(availableStates);
    },[]);

    const createAd = () => {
        console.log(input);
    }

    return(<>
        <ul className='stageBar verticalAlign'>
            <li>
                <StageImg stageNumber={0} formStage={stage}/>
                <label className={stage===0 ? 'currentStage' : ''}>Identificação</label>
            </li>
            <li>
                <StageImg stageNumber={1} formStage={stage}/>
                <label className={stage===1 ? 'currentStage' : ''}>Localização</label>
            </li>
            <li>
                <StageImg stageNumber={2} formStage={stage}/>
                <label className={stage===2 ? 'currentStage' : ''}>Imagem</label>
            </li>
        </ul>
        {(stage === 0 ? (
            <>
                <div>
                    <label htmlFor='companyName'>Empresa *</label>
                    <div className='field'>
                        <input 
                            type='text' id='companyName' name='companyName'
                            placeholder='Nome da Empresa'
                            value={input.companyName}
                            onChange={e => setInput({...input, companyName: e.target.value})}
                            required={true}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='initialDate'>Tempo de exibição *</label>
                    <div className='field dates'>
                        <input 
                            type='date' id='initialDate' name='initialDate'
                            min={formatDateHtml(today)}
                            value={formatDateHtml(input.initialDate)}
                            onChange={e => setInput({...input, initialDate: new Date(e.target.value)})}
                            required={true}
                        />
                        <h2 className='dateSpacer'>Até</h2>
                        <input 
                            type='date' id='expirationDate' name='expirationDate'
                            min={formatDateHtml(today)}
                            value={formatDateHtml(input.expirationDate)}
                            onChange={e => setInput({...input, expirationDate: new Date(e.target.value)})}
                            required={true}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='linkUrl'>Link *</label>
                    <div className='field'>
                        <input 
                            type='text' id='linkUrl' name='linkUrl'
                            placeholder='Link do Anúncio'
                            value={input.linkUrl}
                            onChange={e => setInput({...input, linkUrl: e.target.value})}
                            required={true}
                        />
                        <img className='inputIcon' src={linkIcon} alt='Ícone de clipe representando link'/>
                    </div>
                </div>
            </>
        ) : stage === 1 ? (
            <div>
                <div className='field'>
                    <label htmlFor='state'>Estado</label>
                    <select 
                        id='state' required={true}
                        value={input.state}
                        onChange={e => setInput({...input, state: e.target.value})}
                    >
                        <option disabled value={''}>Selecione</option>
                        {states.length > 0 && states.map(state => <option value={state.id} key={state.id}>{state.nome}</option>)}
                    </select>
                    <span>Você pode escolher mais de um</span>
                </div>
                <label htmlFor='country'>Link *</label>
                <div className='field'>
                    <input 
                        type='text' id='country' name='country'
                        placeholder='País'
                        value={input.linkUrl}
                        onChange={e => setInput({...input, linkUrl: e.target.value})}
                        required={true}
                    />
                    <img className='inputIcon' src={linkIcon} alt='Ícone de clipe representando link'/>
                </div>
            </div>
        ) : (
            null
        ))}
        <div className='formActions'>
            <input className='cancel' type='submit' value={stage===0 ? 'Cancelar' : 'Voltar'}
                onClick={() => {
                    if(stage===0)
                        setCurrentPage('ads');
                    else
                        setStage(stage-1);
                }}
            />
            <input type='submit' value={stage===2 ? 'Concluir' : 'Continuar'}
                onClick={() => {
                    if(stage===2){
                        createAd();
                        setCurrentPage('ads');
                    }
                    else{
                        setStage(stage+1);
                    }
                }}
            />
        </div>
    </>);
}

const CreateAd = ({setCurrentPage, login, selectedAd}) => {
    return (
        <Background id='createAd'>
            <Header setCurrentPage={setCurrentPage}/>
            <main>
                <div className='formContainer'>
                    <div className='formTitle verticalAlign'>
                        <img src={flag} alt='Ícone colorido de bandeira'/>
                        <h1>{selectedAd ? 'Editar Anúncio' : 'Novo Anúncio'}</h1>
                    </div>
                    <Form selectedAd={selectedAd} setCurrentPage={setCurrentPage}/>
                </div>
            </main>
        </Background>
    );
}

export default CreateAd;
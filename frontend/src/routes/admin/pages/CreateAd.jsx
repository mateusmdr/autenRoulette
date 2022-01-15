import React, {useEffect, useState} from 'react';

import {flag, radio, linkIcon, deleteIcon, imageInput, imgIcon, closeIcon} from '../assets';

import {Chip, Button, LinearProgress} from '@mui/material';

import Background from '../components/Background';
import Header from '../components/Header';

import {formatDateHtml, getData} from '../utils';
import {getStates, getCitiesByState} from '../queries/ibge';
import {createAd} from '../queries/post';
import {updateAd} from '../queries/put';

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

const Form = ({selectedAd, setCurrentPage, credentials}) => {
    const today = new Date();
    const [input, setInput] = useState({
        companyName: selectedAd ? selectedAd.companyName : '',
        initialDate: selectedAd ? new Date(selectedAd.initialDateTime) : today,
        expirationDate: selectedAd ? new Date(selectedAd.expirationDateTime) : new Date(Date.now().valueOf() + 86400000),
        linkUrl : selectedAd ? selectedAd.linkURL : '',
        image: null
    });
    const [selectedStates, setSelectedStates] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    
    const [stage, setStage] = useState(0);

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [fileLoaded, setFileLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        getData({
            method: getStates,
            setter: setStates
        });
    },[]);

    useEffect(() => {
        getData({
            method: () => getCitiesByState(selectedStates),
            setter: setCities
        })
    },[selectedStates]);

    const handleCapture = ({ target }) => {
        setFileLoaded(false);
        setProgress(0);
        setInput({...input, image: target.files[0]});
        const fileReader = new FileReader();
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onprogress = (data) => {
            if (data.lengthComputable) {                                            
                setProgress(parseInt( ((data.loaded / data.total) * 100), 10 ));
            }
        }
        fileReader.onload = (e) => {
            setFileLoaded(true);
        };
    };

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
                <label className={stage===2 ? 'currentStage' : ''}>Banner</label>
            </li>
        </ul>
        {(stage === 0 ? (
            <div>
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
            </div>
        ) : stage === 1 ? (
            <div>
                <div className='field'>
                    <label htmlFor='state'>Estado</label>
                    <select 
                        id='state' required={true}
                        value=''
                        onChange={e => setSelectedStates([...selectedStates, states.find(el => (e.target.value.valueOf() === String(el.id).valueOf()))])}
                    >
                        <option disabled value={''}>Selecione</option>
                        {states.length > 0 && 
                            states.filter(state => (!selectedStates.find(el => el.id === state.id))) // don't show selectedStates as options
                                .sort((a,b) => a.nome.localeCompare(b.nome)) // order by name
                                .map(state => <option value={state.id} key={state.id}>{state.nome}</option>)
                        }
                    </select>
                    <span>Você pode escolher mais de um</span>
                </div>
                <div className='verticalAlign' style={{flexWrap: 'wrap', gap: '4px'}}>
                    {
                        selectedStates.sort((a,b) => a.nome.localeCompare(b.nome)) // order by name
                        .map(state => 
                            <Chip 
                                label={state.nome}
                                marginLeft={0}
                                onDelete={() => setSelectedStates(selectedStates.filter(el => el.id!==state.id))}
                                deleteIcon={<img src={deleteIcon} alt='Remover estado selecionado'/>}
                            />
                        )
                    }
                </div>
                <div className='field'>
                    <label htmlFor='city'>Cidade</label>
                    <select 
                        id='city' required={true}
                        value=''
                        onChange={e => setSelectedCities([...selectedCities, cities.find(el => (e.target.value.valueOf() === String(el.id).valueOf()))])}
                    >
                        <option disabled value={''}>Selecione</option>
                        {cities.length > 0 && 
                            cities.filter(city => (!selectedCities.find(el => el.id === city.id))) // don't show selectedCities as options
                                .map(city => <option value={city.id} key={city.id}>{city.nome}</option>)
                        }
                    </select>
                    <span>Você pode escolher mais de um</span>
                </div>
                <div className='verticalAlign' style={{flexWrap: 'wrap', gap: '4px'}}>
                    {
                        selectedCities.sort((a,b) => a.nome.localeCompare(b.nome)) // order by name
                        .map(city => 
                            <Chip 
                                label={city.nome}
                                marginLeft={0}
                                onDelete={() => setSelectedCities(selectedCities.filter(el => el.id!==city.id))}
                                deleteIcon={<img src={deleteIcon} alt='Remover cidade selecionada'/>}
                            />
                        )
                    }
                </div>
            </div>
        ) : (<div>
                {!input.image ? (<><input
                    accept="image/jpeg,image/png"
                    hidden
                    id="raised-button-file"
                    type="file"
                    onChange={handleCapture}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="raised" component="span">
                        <img src={imageInput} alt='Upload de banner para o anúncio' className='imageInput'/>
                    </Button>
                </label></>) :
                    <div className={`imageProgress${fileLoaded ? ' loaded' : ''}`}>
                        <img src={imgIcon} alt='Ícone de arquivo de imagem'/>
                        <div className='progressBar'>
                            <h3 className='filename'>{input.image.name}</h3>
                            <LinearProgress variant="determinate" value={progress}/>
                            <button onClick={() => {
                                setProgress(0);
                                setFileLoaded(false);
                                setInput({...input, image: null});
                            }} className='closeButton'>
                                <img src={closeIcon} alt='Ícone de fechar a janela'/>
                            </button>
                        </div>
                    </div>
                }
            </div>
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
            {(stage!==2 || fileLoaded) && <input type='submit' value={stage===2 ? 'Concluir' : 'Continuar'}
                onClick={async() => {
                    if(stage===2){
                        if(!selectedAd){
                            const res = await createAd({...credentials, ad: {
                                companyName: input.companyName,
                                expirationDateTime: input.expirationDate.toISOString(),
                                initialDateTime: input.initialDate.toISOString(),
                                linkURL: input.linkUrl,
                                image: input.image,
                                locationFilter: JSON.stringify({
                                    states: selectedStates,
                                    cities: selectedCities
                                })
                            }});
                            if(res){
                                setCurrentPage('ads');
                            }
                            else {
                                setStage(0);
                            }
                        }else {
                            const res = await updateAd({...credentials, ad: {
                                id: selectedAd.id,
                                companyName: input.companyName,
                                expirationDateTime: input.expirationDate.toISOString(),
                                initialDateTime: input.initialDate.toISOString(),
                                linkURL: input.linkUrl,
                                image: input.image,
                                locationFilter: JSON.stringify({
                                    states: selectedStates,
                                    cities: selectedCities
                                })
                            }});
                            if(res) {
                                setCurrentPage('ads');
                            }
                            else{
                                setStage(0);
                            }
                        }
                    }
                    else{
                        setStage(stage+1);
                    }
                }}
            />}
        </div>
    </>);
}

const Page = ({setCurrentPage, credentials, selectedAd}) => {
    return (
        <Background id='createAd'>
            <Header setCurrentPage={setCurrentPage}/>
            <div>
                <div className='formContainer'>
                    <div className='formTitle verticalAlign'>
                        <img src={flag} alt='Ícone colorido de bandeira'/>
                        <h1>{selectedAd ? 'Editar Anúncio' : 'Novo Anúncio'}</h1>
                    </div>
                    <Form 
                        selectedAd={selectedAd}
                        setCurrentPage={setCurrentPage}
                        credentials={credentials}
                    />
                </div>
            </div>
        </Background>
    );
}

export default Page;
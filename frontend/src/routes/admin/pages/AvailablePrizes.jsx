import React, {useState, useEffect} from 'react';

import '../styles/AvailablePrizes.css';

import {editIcon, money} from '../assets';

import Background from '../components/Background';
import Header from '../components/Header';
import Card from '../components/Card';
import Roulette from '../components/Roulette';
import Modal from '../components/Modal';

import {formatDouble, formatResultType, formatPeriodType, getData} from '../utils';
import {getAvailablePrizes} from '../queries/get';
import {updateAvailablePrize} from '../queries/put';

const Page = ({setCurrentPage, credentials}) => {

    const [modalPopup, setModalPopup] = useState(false);
    const [selectedPrize, setSelectedPrize] = useState(null);

    const [input, setInput] = useState({resultType: null, amount: null, maxDraws: null,resetPeriod: null, drawNumber: null});

    const [availablePrizes, setAvailablePrizes] = useState([]);

    useEffect(() => {
        getData({
            method: () => getAvailablePrizes(credentials),
            setter: setAvailablePrizes
        });
    },[credentials]);

    const openModal = (prize) => () => {
        setModalPopup(true);
        setSelectedPrize(prize);
        setInput({
            resultType: prize.resultType,
            amount: prize.resultType === 'success' ? prize.amount : '',
            maxDraws: prize.resultType === 'success' ? prize.maxDraws : '',
            resetPeriod: prize.resultType === 'success' ? prize.resetPeriod : 'daily',
            drawNumber: prize.drawNumber
        });
    }

    const closeModal = ()  => {
        setModalPopup(false);
        setSelectedPrize(null);
    }

    const editPrize = async (newPrize) => {
        const res = await updateAvailablePrize({...credentials, newPrize: {
            id: selectedPrize.id,
            resultType: newPrize.resultType,
            amount: newPrize.amount,
            maxDraws: newPrize.maxDraws,
            resetPeriod: newPrize.resetPeriod
        }});

        if(res){
            let newItems = availablePrizes;
            newItems[availablePrizes.indexOf(selectedPrize)] = {...newItems[availablePrizes.indexOf(selectedPrize)],...newPrize} ;
            console.log(newItems);
            setAvailablePrizes(newItems);
            closeModal();
        }
    }

    const sumPrizeAmounts = availablePrizes
        .filter(item => item.resultType==='success')
        .map(item => item.amount*item.maxDraws)
        .reduce((acc,curr) => acc + Number(curr),0);

    const cards = {
        totalAvailablePrizes: {amount: `R$ ${formatDouble(sumPrizeAmounts)}`, text: 'Total em Prêmios'},
    }

    const PrizeCard = ({prize}) => {
        return (
            <div className='prizeCard horizontalAlign'>
                <div className='verticalAlign'>
                    <h3>{prize.position}</h3>
                    <button>
                        <img src={editIcon} alt='Ícone de lápis indicando edição'
                            onClick={openModal(prize)}/>
                    </button>
                </div>
                <div className='verticalAlign'><h3 className='bold'>Tipo:</h3><h3>{formatResultType(prize.resultType)}</h3></div>
                {prize.resultType === 'success' && (<>
                    <div className='verticalAlign'><h3 className='bold'>Valor:</h3><h3>{`R$ ${formatDouble(prize.amount)}`}</h3></div>
                    <div className='verticalAlign'><h3 className='bold'>Periodicidade:</h3><h3>{formatPeriodType(prize.resetPeriod)}</h3></div>
                    <div className='verticalAlign'><h3 className='bold'>Máximo de sorteios:</h3><h3>{prize.maxDraws}</h3></div>
                    <div className='verticalAlign'><h3 className='bold'>Entregues:</h3><h3>{prize.drawNumber}</h3></div>
                </>)}
            </div>
        )
    }

    const Table = ({items}) => {
        const rows = [items.slice(0,4), items.slice(4,8), items.slice(8,12)];
        return(
            <table>
                <tbody>
                    {rows.map((row, index) => {
                        return(
                            <tr key={index}>
                                {row.map((prize, index) =><td key={index}><PrizeCard prize={prize}/></td>)}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
    return (
        <>
        <Background id={'availablePrizes'}>
            <Header setCurrentPage={setCurrentPage}/>
            <main>
                <div className='verticalAlign pageTitle relative'>
                    <h1>Prêmios Cadastrados </h1>
                    <Roulette values={availablePrizes}/>
                </div>
                <div className='verticalAlign'>
                    <Card imgSrc={money} imgAlt={'Ícone colorido de dinheiro'} {...cards.totalAvailablePrizes}/>
                </div>
                <Table items={availablePrizes.sort((a,b) => a.position - b.position)}/>
            </main>
        </Background>
        {selectedPrize && 
        <Modal show={modalPopup} data={selectedPrize} closeHandler={closeModal} submitHandler={() => editPrize(input)}>
            <hgroup>
                <h1 className='title'>Editar prêmio</h1>
                <h2>Posição na roleta: {selectedPrize.position}</h2>
            </hgroup>
            <label htmlFor='resultType'>Tipo de Resultado</label>
            <div className='field'>
                <select 
                    id='resultType' required={true}
                    value={input.resultType}
                    onChange={e => setInput({...input, resultType: e.target.value})}
                >
                    <option value='success'>Prêmio</option>
                    <option value='fail'>Não foi dessa vez</option>
                    <option value='retry'>Tente novamente</option>
                </select>
            </div>
            {input.resultType === 'success' && <>
            <label htmlFor='amount'>Valor do prêmio</label>
            <div className='field'>
                <input 
                    type='number' id='amount' name='amount'
                    value={input.amount}
                    onChange={e => setInput({...input, amount: e.target.value})}
                    required={true}
                />
            </div>
            <label htmlFor='maxDraws'>Máximo de sorteios</label>
            <div className='field'>
                <input 
                    type='number' id='maxDraws' name='maxDraws'
                    value={input.maxDraws}
                    onChange={e => setInput({...input, maxDraws: e.target.value})}
                    required={true}
                />
            </div>
            <div className='field'>
                <label htmlFor='resetPeriod'>Periodicidade</label>
                <select 
                    id='resetPeriod' required={true}
                    value={input.resetPeriod}
                    onChange={e => setInput({...input, resetPeriod: e.target.value})}
                >
                    <option value='daily'>Diariamente</option>
                    <option value='weekly'>Semanalmente</option>
                    <option value='monthly'>Mensalmente</option>
                    <option value='yearly'>Anualmente</option>
                </select>
            </div>
            </>}
        </Modal>}
        </>
    );
}

export default Page;
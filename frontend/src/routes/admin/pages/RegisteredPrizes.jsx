import React, {useEffect} from 'react';

import {editIcon, money, } from '../assets';

import Background from '../components/Background';
import Header from '../components/Header';
import Card from '../components/Card';
import Roulette from '../components/Roulette';

import {formatDouble, formatResultType, formatPeriodType} from '../utils';

const RegisteredPrizes = ({setCurrentPage, login}) => {
    useEffect(() => import('../styles/RegisteredPrizes.css'));

    const cards = {
        totalRegisteredPrizes: {amount: 'R$ 0000,00', text: 'Total em Prêmios'},
    }

    const items = [
        {position: 1, maxDraws: 15, amount: 500, resultType: 'success',resetPeriod: 'weekly', drawNumber: 10},
        {position: 2, maxDraws: 15, amount: 1200, resultType: 'success',resetPeriod: 'weekly', drawNumber: 10},
        {position: 3, resultType: 'fail',resetPeriod: 'weekly', drawNumber: 10},
        {position: 4, maxDraws: 30, resultType: 'fail',resetPeriod: 'weekly', drawNumber: 10},
        {position: 5, maxDraws: 12, amount: 5000, resultType: 'success',resetPeriod: 'weekly', drawNumber: 10},
        {position: 6, maxDraws: 5, amount: 80000, resultType: 'success',resetPeriod: 'weekly', drawNumber: 10},
        {position: 7, maxDraws: 15, amount: 200, resultType: 'success',resetPeriod: 'weekly', drawNumber: 10},
        {position: 8, maxDraws: 15, amount: 500, resultType: 'success',resetPeriod: 'weekly', drawNumber: 10},
        {position: 9, maxDraws: 15, amount: 500, resultType: 'success',resetPeriod: 'weekly', drawNumber: 10},
        {position: 10, maxDraws: 15, amount: 500, resultType: 'success',resetPeriod: 'weekly', drawNumber: 10},
        {position: 11, maxDraws: 15, amount: 500, resultType: 'success',resetPeriod: 'weekly', drawNumber: 10},
        {position: 12, maxDraws: 15, amount: 500, resultType: 'success',resetPeriod: 'weekly', drawNumber: 10}];

    const PrizeCard = ({prize}) => {
        return (
            <div className='prizeCard horizontalAlign'>
                <div className='verticalAlign'>
                    <h3>{prize.position}</h3>
                    <button><img src={editIcon} alt='Ícone de lápis indicando edição'/></button>
                </div>
                <div className='verticalAlign'><h3 className='bold'>Tipo:</h3><h3>{formatResultType(prize.resultType)}</h3></div>
                {prize.resultType === 'success' && (<>
                    <div className='verticalAlign'><h3 className='bold'>Valor:</h3><h3>{`R$ ${formatDouble(prize.amount)}`}</h3></div>
                    <div className='verticalAlign'><h3 className='bold'>Periodicidade:</h3><h3>{formatPeriodType(prize.resetPeriod)}</h3></div>
                    <div className='verticalAlign'><h3 className='bold'>Ocorrências:</h3><h3>{prize.maxDraws}</h3></div></>)}
                <div className='verticalAlign'><h3 className='bold'>Entregues:</h3><h3>{prize.drawNumber}</h3></div>
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
        <Background id='registeredPrizes'>
            <Header setCurrentPage={setCurrentPage}/>
            <main>
                <div className='verticalAlign pageTitle relative'>
                    <h1>Prêmios Cadastrados </h1>
                    <Roulette values={items}/>
                </div>
                <div className='verticalAlign'>
                    <Card imgSrc={money} imgAlt={'Ícone colorido de dinheiro'} {...cards.totalRegisteredPrizes}/>
                </div>
                <Table items={items}/>
            </main>
        </Background>
    );
}

export default RegisteredPrizes;
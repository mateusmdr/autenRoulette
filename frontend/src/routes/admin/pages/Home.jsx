import React, {useEffect} from 'react';

import Background from '../components/Background';
import Header from '../components/Header';

// import {loginBottomCoins, loginLights, loginTopCoins, personIcon, passwordIcon} from '../assets';

const Home = ({setCurrentPage, login}) => {
    useEffect(() => import('../styles/Home.css'));

    return (
        <Background id='home'>
            <Header setCurrentPage={setCurrentPage}>

            </Header>
        </Background>
    );
}

export default Home;
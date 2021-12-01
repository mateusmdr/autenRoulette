import React from "react";

import Background from './components/Background';

const Home = (setCurrentPage) => {
    return (
        <Background>
            <h1 id='title'>TENTE A SORTE</h1>
            <hgroup>
                <h3>Concorra a prêmio em dinheiro ao girar a roleta.</h3>
                <h3>Você pode girar a roleta <h3 class='bold'>uma vez ao dia</h3></h3>
            </hgroup>
        </Background>
    );
}

export default Home;
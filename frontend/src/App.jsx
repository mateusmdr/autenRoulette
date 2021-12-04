import React, {useState} from 'react';

import * as Pages from './pages';

import './styles/App.css';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');

    const [login, setLogin] = useState({name: '', phone: ''});

    switch(currentPage) {
        case 'home':
            return (
                <Pages.Home 
                    setCurrentPage={setCurrentPage}
                    setLogin={setLogin}
                />
            );
        case 'roulette':
            return (
                <Pages.Roulette
                    setCurrentPage={setCurrentPage}
                    login={login}
                />
            );
        default: return null;
    }    
}

export default App;

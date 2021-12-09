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
        case 'won':
            return (
                <Pages.Won
                    setCurrentPage={setCurrentPage}
                    login={login}
                />
            );
        case 'key':
            return (
                <Pages.Key
                    setCurrentPage={setCurrentPage}
                    login={login}
                />
            );
        case 'success':
            return (
                <Pages.Success
                    setCurrentPage={setCurrentPage}
                    login={login}
                />
            );
        case 'failure':
            return (
                <Pages.Failure
                    setCurrentPage={setCurrentPage}
                    login={login}
                />
            );
        default: return null;
    }    
}

export default App;

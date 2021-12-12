import React, {useState, useEffect} from 'react';

import * as Pages from './pages';

const Admin = () => {
    useEffect(() => import('./styles/Admin.css'));
    
    const [currentPage, setCurrentPage] = useState('login');

    const [login, setLogin] = useState({email: '', password: ''});

    switch(currentPage) {
        case 'login':
            return (
                <Pages.Login
                    setCurrentPage={setCurrentPage}
                    setLogin={setLogin}
                />
            );
        case 'home':
            return (
                <Pages.Home
                    setCurrentPage={setCurrentPage}
                    login={login}
                />
            );
        case 'pendingPrizes':
            return (
                <Pages.PendingPrizes
                    setCurrentPage={setCurrentPage}
                    login={login}
                />
            );
        case 'givenPrizes':
            return (
                <Pages.GivenPrizes
                    setCurrentPage={setCurrentPage}
                    login={login}
                />
            );
        default: return null;
    }    
}

export default Admin;

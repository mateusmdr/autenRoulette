import React, {useState, useEffect} from 'react';

import * as Pages from './pages';

const Admin = () => {
    useEffect(() => import('./styles/Admin.css'));
    
    const [currentPage, setCurrentPage] = useState('login');

    const [login, setLogin] = useState({email: '', password: ''});

    const [selectedAd, setSelectedAd] = useState(null);

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
        case 'registeredPrizes':
            return (
                <Pages.RegisteredPrizes 
                    setCurrentPage={setCurrentPage}
                    login={login}
                />
            );
        case 'ads':
            return (
                <Pages.Ads
                    setCurrentPage={setCurrentPage}
                    login={login}
                    setSelectedAd={setSelectedAd}
                />
            );
        case 'createAd':
            return (
                <Pages.CreateAd
                    setCurrentPage={setCurrentPage}
                    login={login}
                    selectedAd={selectedAd}
                />
            );
        case 'users':
            return (
                <Pages.Users
                    setCurrentPage={setCurrentPage}
                    login={login}
                />
            );
        default: return null;
    }    
}

export default Admin;

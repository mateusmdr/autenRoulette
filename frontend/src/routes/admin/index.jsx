import React, {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';

import './styles/Admin.css';

import * as Pages from './pages';

const cookies = new Cookies();

const Admin = () => {
    useEffect(() => {
        const authCookies = {
            email: cookies.get('email',{path:'/admin'}),
            pwdHash: cookies.get('pwdHash',{path:'/admin'})
        };
        if(authCookies.email && authCookies.pwdHash) {
            setCredentials(authCookies);
            setCurrentPage('home');
        }
    },[])
    const [currentPage, setCurrentPage] = useState('login');

    const [credentials, setCredentials] = useState(null);

    const [selectedAd, setSelectedAd] = useState(null);

    switch(currentPage) {
        case 'login':
            return (
                <Pages.Login
                    setCurrentPage={setCurrentPage}
                    setCredentials={setCredentials}
                />
            );
        case 'home':
            return (
                <Pages.Home
                    setCurrentPage={setCurrentPage}
                    credentials={credentials}
                />
            );
        case 'pendingPrizes':
            return (
                <Pages.PendingPrizes
                    setCurrentPage={setCurrentPage}
                    credentials={credentials}
                />
            );
        case 'givenPrizes':
            return (
                <Pages.GivenPrizes
                    setCurrentPage={setCurrentPage}
                    credentials={credentials}
                />
            );
        case 'availablePrizes':
            return (
                <Pages.AvailablePrizes 
                    setCurrentPage={setCurrentPage}
                    credentials={credentials}
                />
            );
        case 'ads':
            return (
                <Pages.Ads
                    setCurrentPage={setCurrentPage}
                    credentials={credentials}
                    setSelectedAd={setSelectedAd}
                />
            );
        case 'createAd':
            return (
                <Pages.CreateAd
                    setCurrentPage={setCurrentPage}
                    credentials={credentials}
                    selectedAd={selectedAd}
                    setSelectedAd={setSelectedAd}
                />
            );
        case 'users':
            return (
                <Pages.Users
                    setCurrentPage={setCurrentPage}
                    credentials={credentials}
                />
            );
        default: return null;
    }    
}

export default Admin;

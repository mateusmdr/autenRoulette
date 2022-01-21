import React, {useState, useEffect} from 'react';

import * as Pages from './pages'

const Public = () => {
    useEffect(() => import('./styles/App.css'));
    const [currentPage, setCurrentPage] = useState('home');
    const [user, setUser] = useState(null);

    switch(currentPage) {
        case 'home':
            return (
                <Pages.Home 
                    setCurrentPage={setCurrentPage}
                    setUser={setUser}
                />
            );
        case 'roulette':
            return (
                <Pages.Roulette
                    setCurrentPage={setCurrentPage}
                    user={user}
                />
            );
        case 'won':
            return (
                <Pages.Won
                    setCurrentPage={setCurrentPage}
                    user={user}
                />
            );
        case 'key':
            return (
                <Pages.Key
                    setCurrentPage={setCurrentPage}
                    user={user}
                />
            );
        case 'success':
            return (
                <Pages.Success
                    setCurrentPage={setCurrentPage}
                    user={user}
                />
            );
        case 'failure':
            return (
                <Pages.Failure
                    setCurrentPage={setCurrentPage}
                    user={user}
                />
            );
        default: return null;
    }    
}

export default Public;

import React, {useState, useEffect} from 'react';

import * as Pages from './pages'

import {getData} from './utils';
import {generateAds} from './queries/post';

const Geolocation = navigator.geolocation;

const Public = () => {
    useEffect(() => import('./styles/App.css'));

    const [currentPage, setCurrentPage] = useState('home');
    const [user, setUser] = useState({name: '', phone: ''});

    const [amount, setAmount] = useState('');

    const [ads, setAds] = useState([]);

    useEffect(() => {
        Geolocation.getCurrentPosition((position) => {
            console.log({position});
            getData({
                method: () => generateAds({position}),
                setter: setAds,
            });
        }, () => {
            getData({
                method: () => generateAds({position: null}),
                setter: setAds,
            });
        });
    },[]);

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
                    setAmount={setAmount}
                    ads={ads}
                />
            );
        case 'won':
            return (
                <Pages.Won
                    setCurrentPage={setCurrentPage}
                    user={user}
                    amount={amount}
                    ads={ads}
                />
            );
        case 'key':
            return (
                <Pages.Key
                    setCurrentPage={setCurrentPage}
                    user={user}
                    ads={ads}
                />
            );
        case 'success':
            return (
                <Pages.Success
                    setCurrentPage={setCurrentPage}
                    user={user}
                    ads={ads}
                />
            );
        case 'failure':
            return (
                <Pages.Failure
                    setCurrentPage={setCurrentPage}
                    user={user}
                    ads={ads}
                />
            );
        default: return null;
    }    
}

export default Public;

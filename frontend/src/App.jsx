import React, {useState} from 'react';

import * as Pages from './pages';

import './styles/App.css';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');

    switch(currentPage) {
        case 'home':
            return (
                <Pages.Home 
                    setCurrentPage={setCurrentPage}
                />
            );
        default: return null;
    }    
}

export default App;

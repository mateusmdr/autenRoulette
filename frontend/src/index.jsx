import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './index.css';
import Main from './routes/';
import Admin from './routes/admin/'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='admin' element={<Admin />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

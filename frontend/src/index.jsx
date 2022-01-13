import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './index.css';
import Public from './routes/public/';
import Admin from './routes/admin/'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Public />}/>
        <Route path='admin' element={<Admin />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

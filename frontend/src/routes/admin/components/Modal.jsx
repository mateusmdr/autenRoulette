import React from 'react';

import '../styles/Modal.css';

import {closeIcon} from '../assets';

const Component = ({show, closeHandler, children, submitHandler}) => {
    return (show ? (<div className='modal noScroll'>
        <div className='modalBackground'></div>
        <div className='modalContainer'>
            <button onClick={() => closeHandler()} className='modalCloseButton'>
                <img src={closeIcon} alt='Ícone de fechar a janela'/>
            </button>
            <div>
                {children}
                <div className='row'>
                    <input 
                        type='submit' value='Editar'
                        onClick={() => {
                            submitHandler();
                        }}
                    />
                </div>
            </div>
        </div>
    </div>) : null);
}

export default Component;
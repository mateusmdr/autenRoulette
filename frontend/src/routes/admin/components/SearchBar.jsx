import React from 'react';
import { searchIcon } from "../assets";

const Component =  ({value, onChange}) => {
    return (
        <div className='relative'>
            <input 
                type='text' id='filter' name='filter' placeholder='Pesquise aqui'
                value={value}
                onChange={onChange}
                maxLength={255}
                required
            />
            <img className='inputIcon' src={searchIcon} alt='Ícone de lupa'/>
        </div>
    );
}

export default Component;
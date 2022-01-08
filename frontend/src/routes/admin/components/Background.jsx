import React from 'react'
import '../styles/Background.css';

const Component = ({children, id}) => {
    return (
        <div className='background' id={id}>
            {children}
        </div>
    );
}

export default Component;
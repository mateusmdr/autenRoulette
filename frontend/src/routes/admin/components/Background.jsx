import React, {useEffect} from 'react'

const Background = ({children, id}) => {
    useEffect(() => import('../styles/Background.css'));

    return (
        <div className='background' id={id}>
            {children}
        </div>
    );
}

export default Background;
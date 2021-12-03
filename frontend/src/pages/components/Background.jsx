import React from "react";
import bottomLeftCoins from '../assets/bottomLeftCoins.svg';
import bottomRightLights from '../assets/bottomRightLights.svg';

const Background = (props) => {
    return (
        <div id='background'>
            <main id={props.id}>
                {props.children}
            </main>
            <img className='bottomLeftCoins' src={bottomLeftCoins} alt='Moedas douradas'/>
            <img className='bottomRightLights' src={bottomRightLights} alt='Arco de luzes brancas'/>
        </div>
    )
}

export default Background;
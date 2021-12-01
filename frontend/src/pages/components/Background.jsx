import React from "react";
import bottomLeftCoins from '../assets/bottomLeftCoins.svg';
import bottomRightLights from '../assets/bottomRightLights.svg';

const Background = (props) => {
    return (
        <div id='background'>
            <main>
                {props.children}
            </main>
            <img class='bottomLeftCoins' src={bottomLeftCoins} alt='Moedas douradas'/>
            <img class='bottomRightLights' src={bottomRightLights} alt='Arco de luzes brancas'/>
        </div>
    )
}

export default Background;
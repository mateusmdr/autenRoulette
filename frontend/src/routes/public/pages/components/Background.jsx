import React from "react";
import '../../styles/Background.css';

const Background = (props) => {    
    return (
        <div id='background'>
            <div id={props.id}>
                {props.children}
            </div>
        </div>
    )
}

export default Background;
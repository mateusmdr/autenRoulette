import React from "react";

import '../../styles/Background.css';

const Background = (props) => {
    return (
        <div id='background'>
            <main id={props.id}>
                {props.children}
            </main>
        </div>
    )
}

export default Background;
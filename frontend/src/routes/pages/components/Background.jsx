import React, {useEffect} from "react";

const Background = (props) => {
    useEffect(() => import('../../styles/Background.css'));
    
    return (
        <div id='background'>
            <main id={props.id}>
                {props.children}
            </main>
        </div>
    )
}

export default Background;
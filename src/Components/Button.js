import React from 'react';
import "./Button.css"

const Button = (props) => {
    return (
        <>
            <button id={props.buttonId} className={props.class}>{props.label}</button>
        </>
    );
};

export default Button;
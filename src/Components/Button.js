import React from 'react';
import "./Button.css"

const Button = (props) => {

    function handleClick() {
        props.parser(props.label);
    }

    return (
        <>
            <button id={props.buttonId} className={props.class} onClick={handleClick}>
                {props.label}
            </button>
        </>
    );
};

export default Button;
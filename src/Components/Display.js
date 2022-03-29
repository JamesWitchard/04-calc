import React from 'react';

import "./Display.css"

const Display = (props) => {
    return (
        <div id="display" className="digital">
            {props.text}
        </div>
    );
};

export default Display;
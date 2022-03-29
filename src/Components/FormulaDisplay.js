import React from 'react';

import "./FormulaDisplay.css"

const FormulaDisplay = (props) => {
    return (
        <div id="formula-display" className="digital">
            {props.text}
        </div>
    );
};

export default FormulaDisplay;
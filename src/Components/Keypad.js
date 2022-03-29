import React from 'react';
import Button from "./Button";
import "./Keypad.css"
const Keypad = () => {
    return (
        <div className="grid">
            <Button
                class="grid-col-span-2 colour-red"
                buttonId="clear"
                label="AC"
            />
            <Button
                class="colour-light-grey"
                buttonId="divide"
                label="/"
            />
            <Button
                class="colour-light-grey"
                buttonId="multiply"
                label="x"
            />
            <Button
                buttonId="seven"
                label="7"
            />
            <Button
                buttonId="eight"
                label="8"
            />
            <Button
                buttonId="nine"
                label="9"
            />
            <Button
                class="colour-light-grey"
                buttonId="subtract"
                label="-"
            />
            <Button
                buttonId="four"
                label="4"
            />
            <Button
                buttonId="five"
                label="5"
            />
            <Button
                buttonId="six"
                label="6"
            />
            <Button
                class="colour-light-grey"
                buttonId="add"
                label="+"
            />
            <Button
                buttonId="one"
                label="1"
            />
            <Button
                buttonId="two"
                label="2"
            />
            <Button
                buttonId="three"
                label="3"
            />
            <Button
                class="grid-row-span-2 colour-blue"
                buttonId="equals"
                label="="
            />
            <Button
                class="grid-col-span-2"
                buttonId="zero"
                label="0"
            />
            <Button
                buttonId="decimal"
                label="."
            />
        </div>
    );
};

export default Keypad;
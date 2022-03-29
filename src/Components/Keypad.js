import React from 'react';
import Button from "./Button";
import "./Keypad.css"

const Keypad = (props) => {
    return (
        <div className="grid">
            <Button
                class="grid-col-span-2 colour-red"
                buttonId="clear"
                label="AC"
                parser={props.parser}
            />
            <Button
                class="colour-light-grey"
                buttonId="divide"
                label="/"
                parser={props.parser}
            />
            <Button
                class="colour-light-grey"
                buttonId="multiply"
                label="x"
                parser={props.parser}
            />
            <Button
                buttonId="seven"
                label="7"
                parser={props.parser}
            />
            <Button
                buttonId="eight"
                label="8"
                parser={props.parser}
            />
            <Button
                buttonId="nine"
                label="9"
                parser={props.parser}
            />
            <Button
                class="colour-light-grey"
                buttonId="subtract"
                label="-"
                parser={props.parser}
            />
            <Button
                buttonId="four"
                label="4"
                parser={props.parser}
            />
            <Button
                buttonId="five"
                label="5"
                parser={props.parser}
            />
            <Button
                buttonId="six"
                label="6"
                parser={props.parser}
            />
            <Button
                class="colour-light-grey"
                buttonId="add"
                label="+"
                parser={props.parser}
            />
            <Button
                buttonId="one"
                label="1"
                parser={props.parser}
            />
            <Button
                buttonId="two"
                label="2"
                parser={props.parser}
            />
            <Button
                buttonId="three"
                label="3"
                parser={props.parser}
            />
            <Button
                class="grid-row-span-2 colour-blue"
                buttonId="equals"
                label="="
                parser={props.parser}
            />
            <Button
                class="grid-col-span-2"
                buttonId="zero"
                label="0"
                parser={props.parser}
            />
            <Button
                buttonId="decimal"
                label="."
                parser={props.parser}
            />
        </div>
    );
};

export default Keypad;
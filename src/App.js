import {useEffect, useState} from "react";

import FormulaDisplay from "./Components/FormulaDisplay";
import Display from "./Components/Display";
import Keypad from "./Components/Keypad";

import './App.css';

const operators = /[+/\-x\*]/

function App() {
    const [formulaText, setFormulaText] = useState([""]);
    const [displayText, setDisplayText] = useState(["0"]);
    const [canAcceptInput, setCanAcceptInput] = useState(true);
    const [usedOperator, setUsedOperator] = useState(false);


    function clearAll() {
        clearFormula();
        clearDisplay();
    }

    function clearFormula() {
        setFormulaText([]);
    }

    function clearDisplay() {
        setDisplayText(["0"]);
    }

    function canAddInput() {
        if (!canAcceptInput) return false;
        if (displayText.length >= 22) {
            let oldDisplayText = [...displayText];
            setCanAcceptInput(false);
            setDisplayText(("Digit Limit Met").split(""))
            setTimeout(() => {
                setDisplayText([...oldDisplayText]);
                setCanAcceptInput(true);
            }, 1500);
            return false;
        }
        return true;
    }

    function parseInput(input) {
        switch(input) {
            case "AC": {
                clearAll();
                return;
            }
            case "0": {
                if (!canAddInput()) return;
                // make sure that the 0 in the display is replaced with the button pressed, and pushing the button
                // pressed to the formula string array as well.
                if (displayText[0] === "0" && displayText[1] !== ".") {
                    setFormulaText([input])
                    return;
                }
                setDisplayText([...displayText, input]);
                setFormulaText([...formulaText, input]);
                return;
            }

            case "1": case "2": case "3": case "4":
            case "5": case "6": case "7": case "8":
            case "9": {
                if (!canAddInput()) return;
                // make sure that the 0 in the display is replaced with the button pressed, and pushing the button
                // pressed to the formula string array as well.
                if (displayText[0] === "0" && displayText[1] !== ".") {
                    setDisplayText([input]);
                    setFormulaText([input]);
                    return;
                }
                setDisplayText([...displayText, input]);
                setFormulaText([...formulaText, input]);
                return;
            }

            case ".": {
                if (!canAddInput()) return;
                // walk through display text array and make sure decimal doesn't already exist.
                if (!displayText.every(item => item !== input)) return;
                setDisplayText([...displayText, input]);
                setFormulaText([...formulaText, input]);
                return;
            }

            case "/": case "x": case "-": case "+": {
                if (!canAddInput()) return;
                // make sure that the 0 in the display is replaced with the button pressed, and pushing the button
                // pressed to the formula string array as well.
                if (displayText[0] === "0" && displayText[1] !== ".") {
                    setDisplayText([input]);
                    setFormulaText([input]);
                    return;
                }
                setDisplayText([input]);
                setFormulaText([...formulaText, input]);
                return;
            }
            default:
                break;

        }
    }

    function handleOperators() {
        // handle removing operators from front of display. Hacky but needs to be done.
        if (!operators.test(displayText[0])) return;
        if (displayText.length < 1) return;
        displayText.shift();
        //setDisplayText(displayText.shift());

    }

    function formatOperators() {
        // replace all the x's in the formula display with *'s, for the eval function to work.
        if((/x/g).test(formulaText.join(""))) {
            setFormulaText([...formulaText.join("")
                .replace("x", "*")
                .split("")]
            );
        }
        // figure out if the last two entries in the formatText array were operators
        if (operators.test(formulaText[formulaText.length-1]) && operators.test(formulaText[formulaText.length - 2])) {
            let lastElement = formulaText[formulaText.length - 1];
            formulaText.pop();
            formulaText.pop();
            setFormulaText([...formulaText, lastElement])
        }
    }

    useEffect(clearAll, []);

    //useEffect(handleOperators, [displayText]);

    useEffect(formatOperators, [formulaText])

  return (
    <div className="App">

        <div className="calculator">
            <FormulaDisplay text={formulaText} />
            <Display text={displayText} />
            <Keypad parser={parseInput}/>
        </div>
        <p>Coded by</p>
        <a href="https://github.com/JamesWitchard">James Witchard</a>

    </div>
  );
}

export default App;

import {useEffect, useState} from "react";

import FormulaDisplay from "./Components/FormulaDisplay";
import Display from "./Components/Display";
import Keypad from "./Components/Keypad";

import './App.css';

const operators = /[+/\-*x]/,
    beginsWithOperator = /^[+/\-*]/

function App() {
    const [formulaText, setFormulaText] = useState([""]);
    const [displayText, setDisplayText] = useState(["0"]);
    const [canAcceptInput, setCanAcceptInput] = useState(true);
    const [gotAnswer, setGotAnswer] = useState(false);
    const [lastAnswer, setLastAnswer] = useState([]);

    function clearAll() {
        clearFormula();
        clearDisplay();
        setLastAnswer([""]);
        setGotAnswer(false);
    }

    function clearFormula() {
        setFormulaText([""]);
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
            case "0": case "1": case "2": case "3":
            case "4": case "5": case "6": case "7":
            case "8": case "9": {
                if (!canAddInput()) return;
                // make sure that the 0 in the display is replaced with the button pressed, and pushing the button
                // pressed to the formula string array as well.
                if ((displayText[0] === "0" && displayText[1] !== ".") || gotAnswer) {
                    setGotAnswer(false);
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
                if (gotAnswer) {
                    setGotAnswer(false);
                    // hard coded value because I don't know enough about react yet to make it update properly.
                    setDisplayText(["0", "."]);
                    setFormulaText(["0", "."]);
                    return;
                }
                setDisplayText([...displayText, input]);
                setFormulaText([...formulaText, input]);
                return;
            }
            case "/": case "x": case "+": case "-": {
                if (!canAddInput()) return;
                if (gotAnswer) {
                    setGotAnswer(false);
                    setDisplayText([input]);
                    setFormulaText([...lastAnswer, input]);
                    setLastAnswer([""]);
                    return;
                }
                setDisplayText([input]);
                setFormulaText([...formulaText, input]);
                return;
            }
            case "=": {
                setGotAnswer(true);
                let expression = formulaText.join("")
                    .replace(/[.]$/, ".0")
                    .replace("--", "+0+0+0+0+0+0+");
                let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
                setLastAnswer(answer.toString().split(""));
                setFormulaText([...formulaText, "=", ...answer.toString().split("")]);
                setDisplayText([...answer.toString().split("")]);
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
        displayText[0] = "";
    }

    function formatOperators() {
        // replace all the x's in the formula display with *'s, for the eval function to work.
        if((/x/g).test(formulaText.join(""))) {
            setFormulaText([...formulaText.join("")
                .replace("x", "*")
                .split("")]
            );
            setDisplayText(["x"]);
        }
        let formString = formulaText.join("");
        // does the formula begin with an operator ("+", "*", "-", "/")
        if (beginsWithOperator.test(formString)) {
            // if yes, check if the next character in the formula is also an operator.
            if (!operators.test(formString[1])) return;
            // if yes, replace the first character in the operator with the last input operator and set both displays
            // correctly.
            let displayValue = formString[1];
            formulaText.shift();
            setFormulaText([...formulaText]);
            setDisplayText([displayValue === "*" ? "x" : displayValue]);

        } else {
            // if no, then check for operators throughout the rest of the string.
            let displayValue = formString[formString.length - 1];
            // check if there are repeating operators (e.g. "\\", "+*", etc), and replace the operators with the last
            // input operator (excluding operators that begin with "-" as they are a special case)
            if ((/\d([+\/*]){2,}/).test(formString)) {
                formulaText.splice(-2, 2);
                setFormulaText([...formulaText, displayValue]);
                setDisplayText([displayValue === "*" ? "x" : displayValue]);
            // else check if the equation has an invalid negative operation ("9+-*"), and replaces it with the last
            // input operator.
            } else if ((/\d([+\/*])-([+\/*])/).test(formString)) {
                formulaText.splice(-3, 3);
                setFormulaText([...formulaText, displayValue]);
                setDisplayText([displayValue === "*" ? "x" : displayValue]);
            // else check for invalid double negative ("9/--") and replace it with a single negative
            } else if ((/\d([+\/*])-{2,}/).test(formString)) {
                formulaText.pop();
                setFormulaText([...formulaText]);
                setDisplayText(["-"]);
            // finally check for invalid operators after negative value ("-/", "-+", "-*", etc) and replace with the
            // last input operator
            } else if ((/-([+\/*])/).test(formString)) {
                formulaText.splice(-2, 2);
                setFormulaText([...formulaText, displayValue]);
                setDisplayText([displayValue === "*" ? "x" : displayValue]);
            }
        }
        // check if there are more than two negative operators, and replace it with a double
        if ((/\d-{3,}/g).test(formString)) {
            setFormulaText(formString
                .replace(/-{3,}/g, "--")
                .split(""));
            setDisplayText(["-"]);
        }
    }

    function handleDecimal() {
        formulaText.forEach((item, index, arr) => {
            if (item !== ".") return;
            if ((/\d/).test(arr.at(index - 1))) return;
            arr[index] = item.replace(".", "0.");
        })
        displayText.forEach((item, index, arr) => {
            if (item !== ".") return;
            if ((/\d/).test(arr.at(index - 1))) return;
            arr[index] = item.replace(".", "0.");
        })


    }

    useEffect(clearAll, []);

    useEffect(handleOperators, [displayText]);

    useEffect(() => {
        formatOperators();
        handleDecimal();
    }, [formulaText])

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

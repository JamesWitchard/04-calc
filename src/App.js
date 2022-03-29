import {useEffect, useState} from "react";

import FormulaDisplay from "./Components/FormulaDisplay";
import Display from "./Components/Display";
import Keypad from "./Components/Keypad";

import './App.css';

function App() {
    const [formulaText, setFormulaText] = useState([]);
    const [displayText, setDisplayText] = useState(["0"]);
    const [canAcceptInput, setCanAcceptInput] = useState(true);

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
                if (displayText[0] === "0"){
                    setFormulaText([input])
                    return;
                }
                setDisplayText([...displayText, input]);
                setFormulaText([...formulaText, input]);
                return;
            }
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9": {
                if (!canAddInput()) return;
                if (displayText[0] === "0"){
                    setDisplayText([input]);
                    setFormulaText([input]);
                    return;
                }
                setDisplayText([...displayText, input]);
                setFormulaText([...formulaText, input])
                return;
            }
            default:
                break;

        }
    }

    useEffect(() => {
        clearAll();
    }, []);

  return (
    <div className="App">

        <div className="calculator">
            <FormulaDisplay text={formulaText}/>
            <Display text={displayText}/>
            <Keypad parser={parseInput}/>
        </div>
        <p>Coded by</p>
        <a href="https://github.com/JamesWitchard">James Witchard</a>

    </div>
  );
}

export default App;

import './App.css';
import FormulaDisplay from "./Components/FormulaDisplay";
import Display from "./Components/Display";
import Keypad from "./Components/Keypad";

function App() {
  return (
    <div className="App">

        <div className="calculator">
            <FormulaDisplay />
            <Display />
            <Keypad />
        </div>
        <p>Coded by</p>
        <a href="https://github.com/JamesWitchard">James Witchard</a>

    </div>
  );
}

export default App;

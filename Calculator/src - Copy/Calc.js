import { useState } from "react";

function Calc() {
    const[text,setText] = useState("");
    function onChange(val) {
        setText(prevText=>prevText+val);
    }
    function handleClear() {
        setText("");
    };

    function handleOperation (operation) {
        setText(prevText => prevText + operation);
    };

    function handleEquals() {
        try {
            setText(eval(text).toString());
        } catch (error) {
            setText("Error");
        }
    };
    return(
        
    <div className="container">
    <div className="calculator">
        <input type="text" className="form-control text-right" id="display" value={text}  readOnly></input>
        <div className="row">
            <div className="col-3"><button className="btn btn-secondary" onClick={() =>onChange('7')}>7</button></div>
            <div className="col-3"><button className="btn btn-secondary" onClick={() =>onChange('8')}>8</button></div>
            <div className="col-3"><button className="btn btn-secondary" onClick={() =>onChange('9')}>9</button></div>
            <div className="col-3"><button className="btn btn-primary" onClick={()=>handleOperation("/")}>/</button></div>
        </div>
        <div className="row">
            <div className="col-3"><button className="btn btn-secondary" onClick={() =>onChange('4')}>4</button></div>
            <div className="col-3"><button className="btn btn-secondary" onClick={() =>onChange('5')}>5</button></div>
            <div className="col-3"><button className="btn btn-secondary" onClick={() =>onChange('6')}>6</button></div>
            <div className="col-3"><button className="btn btn-primary" onClick={()=>handleOperation("*")}>*</button></div>
        </div>
        <div className="row">
            <div className="col-3"><button className="btn btn-secondary" onClick={() =>onChange('1')}>1</button></div>
            <div className="col-3"><button className="btn btn-secondary" onClick={() =>onChange('2')}>2</button></div>
            <div className="col-3"><button className="btn btn-secondary" onClick={() =>onChange('3')}>3</button></div>
            <div className="col-3"><button className="btn btn-primary" onClick={()=>handleOperation("-")}>-</button></div>
        </div>
        <div className="row">
            <div className="col-3"><button className="btn btn-secondary" onClick={() =>onChange('0')}>0</button></div>
            <div className="col-3"><button className="btn btn-secondary" onClick={() =>onChange(".")}>.</button></div>
            <div className="col-3"><button className="btn btn-success" onClick={handleEquals}>=</button></div>
            <div className="col-3"><button className="btn btn-primary" onClick={()=>handleOperation("+")}>+</button></div>
        </div>
        <div className="row">
            <div className="col-12"><button className="btn btn-danger" onClick={handleClear}>Clear</button></div>
        </div>
    </div>
</div>
    );
    
}
export default Calc;
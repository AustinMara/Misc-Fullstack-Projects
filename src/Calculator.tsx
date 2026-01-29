import Mexp from "math-expression-evaluator";

const display = document.getElementById('display');

let result:(Operations | number)[] = [];

enum Operations {
    MULTIPLY = '*',
    DIVIDE = '/',
    ADD = '+',
    SUBTRACT = '-',
    CLEAR = 'C',
    EQUAL = '='
}

function calculate(){
    const mexp = new Mexp;
    const res = result.join("");
    var final = mexp.eval(res)

    result = [final];
    updateDisplay();
}

function updateDisplay(){
    if(display){
        display.textContent = result.join("");
    }
}

function handleClick(value:(number | Operations)){
    switch (value) {
        case Operations.CLEAR:
            result = [0];
            updateDisplay();
            return;
        case Operations.EQUAL:
            calculate();
            return;
        default:
            //result.push(value);
            break;
    }
    if(typeof value === 'string' && typeof result.at(-1) === 'string'){
        result.pop();
    }

    result.push(value);
    updateDisplay();


}






function OperationButton(operation:Operations){
    const newButton = document.createElement('button');
    newButton.id = `button_${operation}`;
    //newButton.insertAdjacentHTML("afterbegin", buttonStyling);
    newButton.classList.add('btn', 'btn-secondary');

    newButton.textContent = `${operation}`;

    //newButton.insertAdjacentHTML('beforebegin', "class= flex text-2xl")
    newButton.addEventListener('click', () => {handleClick(operation)});
    const container = document.getElementById('operator-container');
    container?.appendChild(newButton);
}

// const digitButtonStyling:string = (
//     "btn btn-primary"
// );



function DigitButton(digit:number){
    const newButton = document.createElement(`button`);

    newButton.classList.add('btn', 'btn-primary');
    newButton.textContent = `${digit}`;
    newButton.addEventListener('click', () =>{handleClick(digit);});
    const container = document.getElementById('digit-container');
    container?.appendChild(newButton);


}


function CreateOperations() {
    Object.values(Operations).forEach(operation => {
        OperationButton(operation);
    })
}

function CreateDigits() {
    for (let i = 0; i <= 9; i++) {
        DigitButton(i);
    }
}

export function setupCalculator() {
    CreateOperations();
    CreateDigits();
}

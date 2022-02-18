function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return +a - +b;
}

function multiply(a, b) {
    return +a * +b;
}

function divide(a, b) {
    return +a / +b //need to make this handle divide by zero?
}

function operate(sign, a, b) {
    switch (sign) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
        default:
            return 0 //maybe some sort of error code
    }
}

// const numButtons = document.querySelectorAll('.num');
const calcButtons = document.querySelectorAll('button');
const currentDisplay = document.querySelector('.current');
const prevDisplay = document.querySelector('.past-calc');
// const ACButton = document.querySelector('.ac');
// const equalButton = document.querySelector('.equal');
let firstVar = true;
let op = false;
let secondVar = false;

let a = ''
let opSign = ''
let b = ''
let prevDisp = ''
let usedDot = false


function storeInput(e) {
    console.log(e.target.className);
    if (e.target.className == 'num') {
        if (firstVar) {
            a += e.target.textContent;
            prevDisplay.textContent = prevDisp;
            currentDisplay.textContent = a;

        } else if (secondVar) {
            b += e.target.textContent;
            currentDisplay.textContent = a + opSign + b;
        }
    } else if (e.target.className == 'op') {
        if (!op && a != '') {
            firstVar = false;
            op = true;
            secondVar = true;
            usedDot = false;
            opSign = e.target.textContent;
            currentDisplay.textContent = a + opSign;

        } else if (op && b != '') {


            a = operate(opSign, a, b);
            prevDisp = a
            usedDot = false;
            opSign = e.target.textContent;
            prevDisplay.textContent = prevDisp;
            currentDisplay.textContent = a + opSign;
            b = '';

        }
    } else if (e.target.className == 'equal') {
        if (b != '') { //only caculate if second var is present
            op = false;
            usedDot = false;
            prevDisp = a + opSign + b + '=';
            a = operate(opSign, a, b);
            b = '';
            currentDisplay.textContent = a;
            prevDisplay.textContent = prevDisp;


            //do calculation and print
        }
    } else if (e.target.className == 'ac') {
        firstVar = true;
        op = false;
        secondVar = false;
        usedDot = false;

        a = ''
        opSign = ''
        b = ''
        prevDisp = ''

        currentDisplay.textContent = '';
        prevDisplay.textContent = '';
    } else if (e.target.className == 'dot') {
        if (!usedDot) {
            if (firstVar) {
                a += e.target.textContent;
                prevDisplay.textContent = prevDisp;
                currentDisplay.textContent = a;

            } else if (secondVar) {
                b += e.target.textContent;
                currentDisplay.textContent = a + opSign + b;
            }

            usedDot = true;
        }
    } else if (e.target.className == 'del') {
        let last = currentDisplay.textContent.charAt(currentDisplay.textContent.length - 1);
        if (currentDisplay.textContent == 'Infinity') { //reset if infinity
            firstVar = true;
            op = false;
            secondVar = false;
            usedDot = false;

            a = ''
            opSign = ''
            b = ''
            prevDisp = ''

            currentDisplay.textContent = '';
            prevDisplay.textContent = '';
        }
        if (last == '') {
            // do nothing
        } else {
            if (/\d/.test(last)) {
                if (prevDisplay.textContent.charAt(prevDisplay.textContent.length - 1) != '=' || 
                    currentDisplay.textContent.match(/\-|\+|\\|\*/)) {
                if (firstVar) {
                    a = a.substring(0, a.length - 1)
                } else {
                    b = b.substring(0, b.length - 1)
                }
                currentDisplay.textContent = currentDisplay.textContent.substring(0, currentDisplay.textContent.length - 1);
            }

            } else if (last == '.') {
                
                    if (firstVar && typeof(a) != 'number') { //if equal number then it was previously calculated
                        a = a.substring(0, a.length - 1)
                    } else {
                        b = b.substring(0, b.length - 1)
                    }
                    usedDot = false;
                    currentDisplay.textContent = currentDisplay.textContent.substring(0, currentDisplay.textContent.length - 1);

            } else { //it is an operation
                firstVar = true;
                op = false;
                secondVar = false;
                if (currentDisplay.textContent.indexOf('.') > -1) {
                    usedDot = True;
                }
                currentDisplay.textContent = currentDisplay.textContent.substring(0, currentDisplay.textContent.length - 1);
            }
            
        }
    }
}


calcButtons.forEach(element => {
    element.addEventListener('click', storeInput);
});
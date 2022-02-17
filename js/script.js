function add(a,b){
    return +a+ +b;
}

function subtract(a,b){
    return +a- +b;
}

function multiply(a,b){
    return +a * +b;
}

function divide(a,b){
    return +a / +b //need to make this handle divide by zero?
}

function operate(sign,a,b){
    switch(sign){
        case '+':
            return add(a,b);
            break;
        case '-':
            return subtract(a,b);
            break;
        case '*':
            return multiply(a,b);
            break;
        case '/':
            return divide(a,b);
            break;
        default:
            return 0 //maybe some sort of error code
    }
}

// const numButtons = document.querySelectorAll('.num');
const calcButtons = document.querySelectorAll('.op,.num,.equal');
const currentDisplay = document.querySelector('.current');
const prevDisplay = document.querySelector('.past-calc');
const ACButton = document.querySelector('.ac');
// const equalButton = document.querySelector('.equal');
let firstVar = true;
let op = false;
let secondVar = false;

let a = ''
let opSign = ''
let b = ''


function storeInput(e){
    console.log(e.target.className);
    if(e.target.className == 'num'){
        if(firstVar){
            a += e.target.textContent;
            //display and break
            currentDisplay.textContent = a;
            
        }else if(secondVar){
            b += e.target.textContent;
            currentDisplay.textContent = a+opSign+b;
        }
    } else if(e.target.className == 'op'){
        if(!op && a != ''){
            firstVar = false;
            op = true;
            secondVar = true;
            opSign = e.target.textContent;
            currentDisplay.textContent = a+opSign;
            //display and break
        }
    } else if(e.target.className == 'equal'){
        if(b != ''){ //only caculate if second var is present
            op = false;
            secondVar = false;

            let answer = operate(opSign,a,b);
            currentDisplay.textContent = answer;
            prevDisplay.textContent = a+opSign+b+'=';

        }
        //do calculation and print
    }
}

// function displayInput(e){
//     text = currentDisplay.textContent.concat(e.target.textContent)
//     currentDisplay.textContent = text.substr(0);//text.length-23);
//     // console.log(e.target.className);

// }

ACButton.addEventListener('click',()=> currentDisplay.textContent='')

// numButtons.forEach(element => {
//     element.addEventListener('click', storeInput);
// });

calcButtons.forEach(element => {
    element.addEventListener('click', storeInput);
});
function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b //need to make this handle divide by zero?
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

const numButtons = document.querySelectorAll('.num');
const opButtons = document.querySelectorAll('.op');
const currentDisplay = document.querySelector('.current');
const ACButton = document.querySelector('.ac');

function displayInput(e){
    text = currentDisplay.textContent.concat(e.target.textContent)
    currentDisplay.textContent = text.substr(0);//text.length-23);

}

ACButton.addEventListener('click',()=> currentDisplay.textContent='')

numButtons.forEach(element => {
    element.addEventListener('click', displayInput);
});

opButtons.forEach(element => {
    element.addEventListener('click', displayInput);
});
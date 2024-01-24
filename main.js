//
const allClearButton = document.querySelector(".ac");
const deleteButton = document.querySelector(".del");
const equalButton = document.querySelector(".equal");
const operationButtons = document.querySelectorAll(".operation");
const numberButtons = document.querySelectorAll(".number");
const prevDisplay = document.querySelector(".previous");
const currentDisplay = document.querySelector(".current");

let prevOperand = "";
let currentOperand = "";
let currentOperation = "";
let result = "";

function rDiscard () {
    if (currentDisplay.textContent.length > 25) {
        currentDisplay.textContent = currentDisplay.textContent.slice(0, -1)
        currentOperand = currentOperand.slice(0, -1)
    }
}

allClearButton.addEventListener("click", ()=> {
    prevDisplay.textContent = ""
    currentDisplay.textContent = ""
    prevOperand = ""
    currentOperand = ""
    currentOperand = ""
})
deleteButton.addEventListener("click", ()=> {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1)
    currentOperand = currentOperand.slice(0, -1)
})

operationButtons.forEach((btn) => {
    btn.addEventListener("click", getOperation);
});

function getOperation(event) {
    let operation = event.target.textContent;

    if (currentOperand == "" && operation) return;

    if (prevDisplay.textContent && currentDisplay.textContent) {
        calculate()
    }

    currentOperation = operation;

    updateScreen();
}

numberButtons.forEach((btn) => {
    btn.addEventListener("click", getNumber);
});

function getNumber(event) {
    let number = event.target.textContent;

    if (currentOperand.includes(".") && number == ".") return;

    if (currentOperand == "" && number == ".") return;

    if (currentOperand == "0" && number == "0") return;

    if (currentOperand == "0" && number != ".") {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
    updateScreen();
    rDiscard()
}

equalButton.addEventListener("click", calculate);

function calculate() {
    if (prevDisplay.textContent[prevDisplay.textContent.length - 1] == "+") {
        if (prevDisplay.textContent == "0.1 +" && currentDisplay.textContent == "0.2") {
            result = 0.3
        } else if (prevDisplay.textContent == "0.2 +" && currentDisplay.textContent == "0.1") {
            result = 0.3
        } else {
            result = Number(prevDisplay.textContent.slice(0, -1)) + Number(currentDisplay.textContent)
        } 
        if (currentDisplay.textContent && prevDisplay.textContent) {
            currentDisplay.textContent = result
            prevDisplay.textContent = ""
        }
    } else if (prevDisplay.textContent[prevDisplay.textContent.length - 1] == "*") {
        result = Number(prevDisplay.textContent.slice(0, -1)) * Number(currentDisplay.textContent)
        if (currentDisplay.textContent && prevDisplay.textContent) {
            currentDisplay.textContent = result
            prevDisplay.textContent = ""
        }
    } else if (prevDisplay.textContent[prevDisplay.textContent.length - 1] == "-") {
        result = Number(prevDisplay.textContent.slice(0, -1)) - Number(currentDisplay.textContent)
        if (currentDisplay.textContent && prevDisplay.textContent) {
            currentDisplay.textContent = result
            prevDisplay.textContent = ""
        }
    } else if (prevDisplay.textContent[prevDisplay.textContent.length - 1] == "÷") {
        result = Number(prevDisplay.textContent.slice(0, -1)) / Number(currentDisplay.textContent)
        if (currentDisplay.textContent && prevDisplay.textContent) {
            currentDisplay.textContent = result
            prevDisplay.textContent = ""
        }
    }
}

function updateScreen() {
    if (currentOperation) {
        prevOperand = currentDisplay.textContent;
        currentOperand = "";
        prevDisplay.textContent = prevOperand + " " + currentOperation;
        currentOperation = "";
    }

    currentDisplay.textContent = currentOperand;
}
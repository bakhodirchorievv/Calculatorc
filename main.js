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

let NUMBERS = JSON.parse(localStorage.getItem("NUMBERS")) || {}

prevOperand = NUMBERS.prevOperand || ""
currentOperand = NUMBERS.currentOperand || ""
currentOperation = NUMBERS.currentOperation || ""
currentDisplay.textContent = NUMBERS.currentDisplay || ""
prevDisplay.textContent = NUMBERS.prevDisplay || ""

function updateLocalStorage () {
    localStorage.setItem("NUMBERS", JSON.stringify({
        prevOperand: prevOperand,
        currentOperand: currentOperand,
        currentOperation: currentOperation,
        currentDisplay: currentDisplay.textContent,
        prevDisplay: prevDisplay.textContent
    }))
}

function rDiscard () {
    if (currentDisplay.textContent.length > 25) {
        currentDisplay.textContent = currentDisplay.textContent.slice(0, -1)
        currentOperand = currentOperand.slice(0, -1)
    }
    updateLocalStorage()
}

allClearButton.addEventListener("click", ()=> {
    prevDisplay.textContent = ""
    currentDisplay.textContent = ""
    prevOperand = ""
    currentOperand = ""
    currentOperand = ""
    updateLocalStorage()
})
deleteButton.addEventListener("click", ()=> {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1)
    currentOperand = currentOperand.slice(0, -1)
    updateLocalStorage()
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
    updateLocalStorage()
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
    updateLocalStorage()
}

equalButton.addEventListener("click", calculate);

function calculate() {
    if (prevDisplay.textContent[prevDisplay.textContent.length - 1] == "+") {
        result = (parseFloat(prevDisplay.textContent.slice(0, -1)) + parseFloat(currentDisplay.textContent)).toFixed(10)
        if (currentDisplay.textContent && prevDisplay.textContent) {
            currentDisplay.textContent = parseFloat(result)
            currentOperand = currentDisplay.textContent
            prevDisplay.textContent = ""
        }
    } else if (prevDisplay.textContent[prevDisplay.textContent.length - 1] == "*") {
        result = (parseFloat(prevDisplay.textContent.slice(0, -1)) * parseFloat(currentDisplay.textContent)).toFixed(10)
        if (currentDisplay.textContent && prevDisplay.textContent) {
            currentDisplay.textContent = parseFloat(result)
            currentOperand = currentDisplay.textContent
            prevDisplay.textContent = ""
        }
    } else if (prevDisplay.textContent[prevDisplay.textContent.length - 1] == "-") {
        result = (parseFloat(prevDisplay.textContent.slice(0, -1)) - parseFloat(currentDisplay.textContent)).toFixed(10)
        if (currentDisplay.textContent && prevDisplay.textContent) {
            currentDisplay.textContent = parseFloat(result)
            currentOperand = currentDisplay.textContent
            prevDisplay.textContent = ""
        }
    } else if (prevDisplay.textContent[prevDisplay.textContent.length - 1] == "÷") {
        result = (parseFloat(prevDisplay.textContent.slice(0, -1)) / parseFloat(currentDisplay.textContent)).toFixed(10)
        if (currentDisplay.textContent && prevDisplay.textContent) {
            currentDisplay.textContent = parseFloat(result)
            currentOperand = currentDisplay.textContent
            prevDisplay.textContent = ""
        }
    }

    updateLocalStorage()
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
updateLocalStorage()

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key) || key === ".") {
        if (currentOperand.includes(".") && key === ".") return;
        if (currentOperand == "" && key === ".") return;
        if (currentOperand == "0" && key === "0") return;
        if (currentOperand == "0" && key !== ".") {
            currentOperand = key;
        } else {
            currentOperand += key;
        }
        updateScreen();
        rDiscard();
        updateLocalStorage();
    }

    if (key == "*" || key == "-" || key == "+" || key == "/") {
        if (key == "/") {
            let operation = "÷";

            if (currentOperand == "" && operation) return;
        
            if (prevDisplay.textContent && currentDisplay.textContent) {
                calculate()
            }
        
            currentOperation = operation;
        
            updateScreen();
            updateLocalStorage()
        } else {
            let operation = key;

            if (currentOperand == "" && operation) return;
        
            if (prevDisplay.textContent && currentDisplay.textContent) {
                calculate()
            }
        
            currentOperation = operation;
        
            updateScreen();
            updateLocalStorage()
        }
 
    }

    if (e.key == "Backspace") {
        currentDisplay.textContent = currentDisplay.textContent.slice(0, -1)
        currentOperand = currentOperand.slice(0, -1)
        updateLocalStorage()
    }

    if (key == "c" || key == "C") {
        prevDisplay.textContent = ""
        currentDisplay.textContent = ""
        prevOperand = ""
        currentOperand = ""
        currentOperand = ""
        updateLocalStorage()
    }

    if (key == "Enter" || key == "=") {
        calculate()
        updateLocalStorage()
    }
});
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let previousInput = '';
let activeOperator = null;
let resetScreenOnNextInput = false;

// Loop through buttons using forEach to assign event listeners
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const type = button.getAttribute('data-type');
        const value = button.getAttribute('data-value');

        if (type === 'number') {
            handleNumber(value);
        } else if (type === 'operator') {
            handleOperator(value);
        } else if (type === 'decimal') {
            handleDecimal();
        } else if (type === 'clear') {
            clearCalculator();
        } else if (type === 'equal') {
            calculate();
        }
        
        updateDisplay();
    });
});

function handleNumber(num) {
    if (currentInput === '0' || resetScreenOnNextInput) {
        currentInput = num;
        resetScreenOnNextInput = false;
    } else {
        currentInput += num;
    }
}

function handleDecimal() {
    if (resetScreenOnNextInput) {
        currentInput = '0.';
        resetScreenOnNextInput = false;
        return;
    }
    // Prevent adding multiple decimals
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function handleOperator(op) {
    if (activeOperator && !resetScreenOnNextInput) {
        calculate();
    }
    previousInput = currentInput;
    activeOperator = op;
    resetScreenOnNextInput = true;
}

function calculate() {
    if (!activeOperator || resetScreenOnNextInput) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result = 0;

    // Standard Math execution using conditional blocks
    if (activeOperator === '+') {
        result = prev + current;
    } else if (activeOperator === '-') {
        result = prev - current;
    } else if (activeOperator === '*') {
        result = prev * current;
    } else if (activeOperator === '/') {
        if (current === 0) {
            result = 'Error'; // Avoid division by zero
        } else {
            result = prev / current;
        }
    }

    // Convert result to string and format decimal spaces if long
    currentInput = result.toString();
    activeOperator = null;
    resetScreenOnNextInput = true;
}

function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    activeOperator = null;
    resetScreenOnNextInput = false;
}

function updateDisplay() {
    display.textContent = currentInput;
}
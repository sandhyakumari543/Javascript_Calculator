document.addEventListener('DOMContentLoaded', function () {
    let display = document.getElementById('display');

    function removeConsecutiveOperator(displayText) {
        const lastChar = displayText.slice(-1);
        const operatorRegex = /[+\-*\/]/;

        if (operatorRegex.test(lastChar) && operatorRegex.test(displayText.charAt(displayText.length - 1))) {
            return displayText.slice(0, -1);
        }
        return displayText;
    }

    function customEval(expression) {
        try {
            // Replace 'x' with '*' and '÷' with '/'
            expression = expression.replace(/x/g, '*').replace(/÷/g, '/');

            // Use eval to calculate the result
            return eval(expression);
        } catch (error) {
            // Handle errors, e.g., division by zero
            return 'Error';
        }
    }

    document.getElementById('clear').addEventListener('click', function () {
        display.value = "0";
    });

    var digitButtons = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    for (let i = 0; i < digitButtons.length; i++) {
        document.getElementById(digitButtons[i]).addEventListener('click', function () {
            updateDisplay(i.toString());
        });
    }

    function updateDisplay(value) {
        display.value = display.value === '0' ? value : display.value + value;
    }

    document.getElementById('delete').addEventListener('click', function () {
        display.value = display.value.slice(0, -1);
    });

    document.getElementById('decimal').addEventListener('click', function () {
        const values = display.value.split(/[\+\-\*\/]/);
        const lastValue = values[values.length - 1];
        if (!lastValue.includes('.')) {
            display.value += '.';
        }
    });

    let operatorButtons = document.getElementsByClassName('operator');
    for (let i = 0; i < operatorButtons.length; i++) {
        operatorButtons[i].addEventListener('click', function () {
            const displayText = removeConsecutiveOperator(display.value);
            display.value = displayText + this.textContent;
        });
    }

    document.getElementById('equals').addEventListener('click', function () {
        display.value = customEval(display.value);
    });
});






const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsText = document.getElementById('results-div');

const isValidNumber = (inputStr) => {
    const lettersRegex = /[a-zA-Z]/;
    const symbolsRegex = /[!@#$%^&*_+={[}\]|\\:;"'<,>.?\/]/;
    if (lettersRegex.test(inputStr) || symbolsRegex.test(inputStr)) {
        console.log('Contains an invalid letter or symbol.');
        return false;
    }

    // Check parenthesis format
    if (!checkParentheses(inputStr)) {
        console.log('Parentheses are not balanced or formatted correctly.');
        return false;
    }

    const number = cleanInput(inputStr);
    if (number.length > 11 || number.length < 10) {
        return false;
    } else {
        if (number.length === 11) {
            if (inputStr[0] !== "1") {
                return false;
            }
        }
    }
    return true;
}

const checkParentheses = (inputStr) => {
    let count = 0;
    let hasParens = false; // Flag to check if any parentheses exist
    for (let i = 0; i < inputStr.length; i++) {
        const char = inputStr[i];
        if (char === '(') {
            count++;
            hasParens = true;
        } else if (char === ')') {
            count--;
            hasParens = true;
        }
        // If we have a closing paren without a matching open one, it's invalid.
        if (count < 0) {
            return false;
        }
    }

    // Final check:
    // 1. If any parens were found, the count must be 0.
    // 2. The count should be either 0 or 2 (for a single pair of parens)
    return (!hasParens || count === 0);
}

const cleanInput = (inputStr) => inputStr.replace(/\D/g, '');

checkBtn.addEventListener('click', () => {
    if (userInput.value === "") {
        alert("Please provide a phone number");
    } else {
        if (isValidNumber(userInput.value)) {
            resultsText.textContent = `Valid US number: ${userInput.value}`;
        } else {
            resultsText.textContent = `Invalid US number: ${userInput.value}`;
        }
    }
});

clearBtn.addEventListener('click', () => {
    userInput.value = "";
    resultsText.textContent = "";
})
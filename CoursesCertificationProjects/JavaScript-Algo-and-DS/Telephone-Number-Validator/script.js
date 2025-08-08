const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsText = document.getElementById('results-div');

const isValidNumber = (inputStr) => {
    const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?(\d{3})[\s\-]?(\d{4})$/;
    return phoneRegex.test(inputStr);
}

checkBtn.addEventListener('click', () => {
    if (userInput.value === "") {
        alert("Please provide a phone number");
    } else {
        const isValid = isValidNumber(userInput.value);
        resultsText.textContent = isValid ? `Valid US number: ${userInput.value}` : `Invalid US number: ${userInput.value}`;
        resultsText.className = isValid ? 'show valid' : 'show invalid';

    }
});

clearBtn.addEventListener('click', () => {
    userInput.value = "";
    resultsText.textContent = "";
    resultsText.className = "";
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkBtn.click();
    }
});
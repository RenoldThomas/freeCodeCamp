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
        return isValidNumber(userInput.value) ?
            resultsText.textContent = `Valid US number: ${userInput.value}` :
            resultsText.textContent = `Invalid US number: ${userInput.value}`;
    }
});

clearBtn.addEventListener('click', () => {
    userInput.value = "";
    resultsText.textContent = "";
})
const resultText = document.getElementById('result');
const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');

// Add Enter key functionality
textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkButton.click();
    }
});

checkButton.addEventListener('click', () => {
    const inputValue = textInput.value;
    if (!inputValue) {
        alert('Please input a value');
    } else {
        const normalizeString = cleanString(inputValue);
        const isPalindrome = checkPalindrome(normalizeString);

        // Remove previous classes
        resultText.classList.remove('show-result', 'not-palindrome');

        // Add appropriate classes with a small delay for animation
        setTimeout(() => {
            resultText.classList.add('show-result');
            if (!isPalindrome) {
                resultText.classList.add('not-palindrome');
            }
        }, 50);

        resultText.innerText = isPalindrome
            ? `${textInput.value} is a palindrome`
            : `${textInput.value} is not a palindrome`;
    }
});

const cleanString = (inputStr) => {
    const alphanumericOnly = inputStr.replace(/[^a-zA-Z0-9]/gi, "");
    const normalizedString = alphanumericOnly.toLowerCase();
    return normalizedString;
}

const checkPalindrome = (inputStr) => {
    return inputStr === [...inputStr].reverse().join('');
}
const resultText = document.getElementById('result');
const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');

checkButton.addEventListener('click', () => {
  const inputValue = textInput.value;
  if (!inputValue) {
    alert('Please input a value');
  } else {
    const normalizeString = cleanString(inputValue);
    const isPalindrome = checkPalindrome(normalizeString);

    // if (isPalindrome) {
    //   resultText.innerText = `${textInput.value} is a palindrome`;
    // } else {
    //   resultText.innerText = `${textInput.value} is not a palindrome`;
    // }
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

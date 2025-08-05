const convertBtn = document.getElementById('convert-btn');
const outputText = document.getElementById('output');
const numberInput = document.getElementById('number');


const romanNumerals = [
  { value: 1000, numeral: "M" },
  { value: 900, numeral: "CM" },
  { value: 500, numeral: "D" },
  { value: 400, numeral: "CD" },
  { value: 100, numeral: "C" },
  { value: 90, numeral: "XC" },
  { value: 50, numeral: "L" },
  { value: 40, numeral: "XL" },
  { value: 10, numeral: "X" },
  { value: 9, numeral: "IX" },
  { value: 5, numeral: "V" },
  { value: 4, numeral: "IV" },
  { value: 1, numeral: "I" },
]

convertBtn.addEventListener('click', () => {
  const numberValue = parseInt(numberInput.value);
  let romanNumeral = "";
  let tempNum = numberValue;

  if (!numberInput.value) {
    outputText.textContent = "Please enter a valid number";
  } else if (numberValue < 1) {
    outputText.textContent = "Please enter a number greater than or equal to 1";
  } else if (numberValue > 3999) {
    outputText.textContent = "Please enter a number less than or equal to 3999";
  } else {
    for (let i = 0; i < romanNumerals.length; i++) {
      while (tempNum >= romanNumerals[i].value) {
        romanNumeral += romanNumerals[i].numeral;
        tempNum -= romanNumerals[i].value;
      }
    }
    outputText.textContent = romanNumeral;
  }
})

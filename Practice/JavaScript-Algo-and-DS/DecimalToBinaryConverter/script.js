const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");

const decimalToBinary = (input) => {
    // Simple Algorithm to convert decimal to binary
    // 1. Divide the number by 2
    // 2. Store the quotient and remainder
    // 3. Repeat the process with the quotient until it becomes 0
    let binary = "";

    if (input === 0) {
        binary = "0";
    }

    while (input > 0) {
        binary = (input % 2) + binary;
        input = Math.floor(input / 2);
    }

    result.innerText = binary;
};

const checkUserInput = () => {
    if (
        !numberInput.value ||
        isNaN(parseInt(numberInput.value)) ||
        parseInt(numberInput.value) < 0
    ) {
        alert("Please provide a decimal number greater than or equal to 0");
        return;
    }

    decimalToBinary(parseInt(numberInput.value));
    numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkUserInput();
    }
});
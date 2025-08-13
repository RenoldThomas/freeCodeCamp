let price = 1.87;

let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

// Define coin/bill values in dollars
const coinValues = {
    'PENNY': 0.01,
    'NICKEL': 0.05,
    'DIME': 0.1,
    'QUARTER': 0.25,
    'ONE': 1,
    'FIVE': 5,
    'TEN': 10,
    'TWENTY': 20,
    'ONE HUNDRED': 100
};

const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDueText = document.getElementById('change-due');
const priceDisplay = document.getElementById('price-display');

// Function to update price display
const updatePriceDisplay = () => {
    priceDisplay.textContent = `$${price}`;
};

purchaseBtn.addEventListener('click', () => {
    const cashValue = parseFloat(cash.value);

    if (isNaN(cashValue)) {
        alert('Please enter a valid amount');
        return;
    }

    const result = getChange(cashValue, price, [...cid]);
    if (result) {
        changeDueText.textContent = result;
    }
});

const getChange = (amountGiven, itemPrice, cashInDrawer) => {
    if (amountGiven < itemPrice) {
        alert('Customer does not have enough money to purchase the item');
        return null;
    }

    if (amountGiven === itemPrice) {
        return 'No change due - customer paid with exact cash';
    }

    let changeNeeded = Math.round((amountGiven - itemPrice) * 100) / 100;

    // Calculate total cash in drawer
    let totalCid = cashInDrawer.reduce((sum, [_, amount]) => sum + amount, 0);
    totalCid = Math.round(totalCid * 100) / 100;

    // If change needed equals total cash in drawer, return CLOSED status
    if (changeNeeded === totalCid) {
        // Try to make exact change
        const result = makeChange(changeNeeded, cashInDrawer);
        if (result.possible) {
            let output = 'Status: CLOSED';
            result.change.forEach(([denomination, amount]) => {
                if (amount > 0) {
                    output += ` ${denomination}: $${amount.toFixed(2)}`;
                }
            });
            return output;
        } else {
            return 'Status: INSUFFICIENT_FUNDS';
        }
    }

    // Try to make change normally
    const result = makeChange(changeNeeded, cashInDrawer);

    if (!result.possible) {
        return 'Status: INSUFFICIENT_FUNDS';
    }

    // Format output for OPEN status
    let output = 'Status: OPEN';
    result.change.forEach(([denomination, amount]) => {
        if (amount > 0) {
            output += ` ${denomination}: $${amount.toFixed(2)}`;
        }
    });

    return output;
};

const makeChange = (changeNeeded, cashInDrawer) => {
    // Denominations in order from highest to lowest value
    const denominations = ['ONE HUNDRED', 'TWENTY', 'TEN', 'FIVE', 'ONE', 'QUARTER', 'DIME', 'NICKEL', 'PENNY'];

    let change = [];
    let remainingChange = changeNeeded;

    // Create a copy of cash in drawer
    let availableCash = {};
    cashInDrawer.forEach(([denomination, amount]) => {
        availableCash[denomination] = amount;
    });

    for (let denomination of denominations) {
        const coinValue = coinValues[denomination];
        const availableAmount = availableCash[denomination];

        if (remainingChange >= coinValue && availableAmount > 0) {
            // Calculate how much of this denomination we can use
            const maxFromRemainingChange = Math.floor(remainingChange / coinValue) * coinValue;
            const amountToUse = Math.min(maxFromRemainingChange, availableAmount);

            if (amountToUse > 0) {
                change.push([denomination, amountToUse]);
                remainingChange = Math.round((remainingChange - amountToUse) * 100) / 100;
                availableCash[denomination] -= amountToUse;
            }
        }
    }

    // Check if we were able to make exact change
    const possible = Math.round(remainingChange * 100) === 0;

    return { possible, change };
};

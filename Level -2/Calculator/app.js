const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let resultDisplayed = false;

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const value = e.target.textContent;

    if (value === 'C') {
      currentInput = '';
      display.value = '';
    }
    else if (value === '=') {
      try {
        // Replace symbols for valid JS operations
        const expression = currentInput
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/−/g, '-');

        const result = eval(expression);
        display.value = result;
        currentInput = result;
        resultDisplayed = true;
      } catch {
        display.value = 'Error';
      }
    }
    else {
      if (resultDisplayed && !isNaN(value)) {
        currentInput = value;
        resultDisplayed = false;
      } else {
        currentInput += value;
      }
      display.value = currentInput;
    }
  });
});
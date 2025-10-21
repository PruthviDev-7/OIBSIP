
class TemperatureConverter {
constructor() {
this.initializeElements();
this.bindEvents();
this.updateResultDisplay('--', '°F');
}
initializeElements() {
this.temperatureInput = document.getElementById('temperature');
this.convertBtn = document.getElementById('convert-btn');
this.errorMessage = document.getElementById('error-message');

this.convertedTemp = document.getElementById('converted-temp');
this.convertedUnit = document.getElementById('converted-unit');
this.resultCard = document.getElementById('result');

this.fromGroup = document.getElementById('from-group');
this.toGroup = document.getElementById('to-group');

this.fromUnit = this.getSelectedUnit(this.fromGroup) || 'celsius';
this.toUnit = this.getSelectedUnit(this.toGroup) || 'fahrenheit';
}

getSelectedUnit(container) {
const selectedOption = container.querySelector('.radio-option.selected');
return selectedOption ? selectedOption.getAttribute('data-value') : null;
}

bindEvents() {

this.convertBtn.addEventListener('click', () => this.convertTemperature());

this.temperatureInput.addEventListener('keyup', (event) => {
if (event.key === 'Enter') {
this.convertTemperature();
}
});

this.temperatureInput.addEventListener('input', () => {
this.hideError();
});

this.setupRadioGroup(this.fromGroup, (unit) => {
this.fromUnit = unit;
this.autoConvertIfValid();
});
this.setupRadioGroup(this.toGroup, (unit) => {
this.toUnit = unit;
this.autoConvertIfValid();
});
}
setupRadioGroup(container, callback) {
const options = container.querySelectorAll('.radio-option');
options.forEach(option => {
option.addEventListener('click', () => {

options.forEach(opt => opt.classList.remove('selected'));

option.classList.add('selected');

const unit = option.getAttribute('data-value');

callback(unit);
});
});
}
validateInput() {
const value = this.temperatureInput.value.trim();
if (value === '') {
this.showError('Please enter a temperature value');
return false;
}
if (isNaN(parseFloat(value))) {
this.showError('Please enter a valid number');
return false;
}
this.hideError();
return true;
}
showError(message) {
this.errorMessage.textContent = message;
this.errorMessage.style.display = 'block';
this.temperatureInput.style.borderColor = '#e74c3c';
this.temperatureInput.style.background = '#fdf2f2';
}
hideError() {
this.errorMessage.style.display = 'none';
this.temperatureInput.style.borderColor = '#e1e5e9';
this.temperatureInput.style.background = '#f8f9fa';
}
convertTemperature() {
if (!this.validateInput()) {
return;
}
const inputTemp = parseFloat(this.temperatureInput.value);
let result;
try {
if (this.fromUnit === this.toUnit) {
result = inputTemp;
} else {

let celsiusTemp;
switch (this.fromUnit) {
case 'celsius':
celsiusTemp = inputTemp;
break;
case 'fahrenheit':
celsiusTemp = (inputTemp - 32) * 5/9;
break;
case 'kelvin':
celsiusTemp = inputTemp - 273.15;
break;
}

switch (this.toUnit) {
case 'celsius':
result = celsiusTemp;
break;
case 'fahrenheit':
result = (celsiusTemp * 9/5) + 32;
break;
case 'kelvin':
result = celsiusTemp + 273.15;
break;
}
}
this.displayResult(result);
} catch (error) {
this.showError('Conversion error occurred');
console.error('Conversion error:', error);
}
}
autoConvertIfValid() {
const value = this.temperatureInput.value.trim();
if (value !== '' && !isNaN(parseFloat(value))) {
this.convertTemperature();
}
}
displayResult(result) {
const formattedResult = this.formatResult(result);
const unitSymbol = this.getUnitSymbol(this.toUnit);
this.updateResultDisplay(formattedResult, unitSymbol);
this.animateResult();
}
formatResult(result) {
if (Math.abs(result) < 0.01 && result !== 0) {
return result.toExponential(2);
}
const rounded = Math.round(result * 100) / 100;
return rounded.toString();
}
getUnitSymbol(unit) {
switch (unit) {
case 'celsius': return '°C';
case 'fahrenheit': return '°F';
case 'kelvin': return 'K';
default: return '';
}
}
updateResultDisplay(temperature, unit) {
this.convertedTemp.textContent = temperature;
this.convertedUnit.textContent = unit;
}
animateResult() {
this.resultCard.classList.remove('result-update');
void this.resultCard.offsetWidth;
this.resultCard.classList.add('result-update');
}
}
TemperatureConverter.formulas = {
celsiusToFahrenheit: (c) => (c * 9/5) + 32,
fahrenheitToCelsius: (f) => (f - 32) * 5/9,
celsiusToKelvin: (c) => c + 273.15,
kelvinToCelsius: (k) => k - 273.15,
fahrenheitToKelvin: (f) => (f - 32) * 5/9 + 273.15,
kelvinToFahrenheit: (k) => (k - 273.15) * 9/5 + 32
};
document.addEventListener('DOMContentLoaded', () => {
new TemperatureConverter();
});
const TemperatureUtils = {

toCelsius: (value, fromUnit) => {
switch (fromUnit) {
case 'celsius': return value;
case 'fahrenheit': return (value - 32) * 5/9;
case 'kelvin': return value - 273.15;
default: return value;
}
},

fromCelsius: (value, toUnit) => {
switch (toUnit) {
case 'celsius': return value;
case 'fahrenheit': return (value * 9/5) + 32;
case 'kelvin': return value + 273.15;
default: return value;
}
},

convert: (value, fromUnit, toUnit) => {
if (fromUnit === toUnit) return value;
const celsius = TemperatureUtils.toCelsius(value, fromUnit);
return TemperatureUtils.fromCelsius(celsius, toUnit);
}
};
// (--Calculator functionality section--)

// Main calc class.

class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear()
	}

	// The calc reset function.

	clear() {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
	}

	// The calc delete one (number, .) function.

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}

	// The appending number function if it had a "." and changing the number value into strings.

	appendNumber(number) {
		if (number === "." && this.currentOperand.includes('.')) return 
			this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	// Deteremanes wether we selected an operand or not.

	chooseOperation(operation) {
		if (this.currentOperand === '') return
		if (this.previousOperand !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	// Does the math and 4 main operations whenever any of them are selected and also changing the current and previous operands to number state instead of letter.

	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return
			switch (this.operation) {
				case '+': 
				  computation = prev + current
				  break
				case '-':  
				  computation = prev - current
				  break
				case 'x': 
				  computation = prev * current
				  break
				case '/': 
				  computation = prev / current
				  break
				default: 
				 return
			}
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = '';
	}

	// Adding a "," after every three numbers and allows us to still use "." in the proccess.

  getDisplayNumber(number) {
  	const stringNumber = number.toString()
  	const integerDigits = parseFloat(stringNumber.split('.')[0])
  	const decimalDigits = stringNumber.split('.')[1]
  	let integerDisplay;

  	if (isNaN(integerDigits)) {
  		integerDisplay = ''
  	} else {
  		integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
  	}

  	if (decimalDigits != null) {
  		return `${integerDisplay}.${decimalDigits}`
  	} else {
  		return integerDisplay;
  	}
  }

  // Adding the numbers entered into the calculator to the display bar and adding the selected operation next to it.

	updateDisplay() {
		this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
		if (this.operation != null) {
			this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand) + " " + this.operation;
		} else {
			this.previousOperandTextElement.innerText = '';
		}
	}
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Calling the main class into a variable.

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Adding a click event to each number button to display it on the display bar.

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	})
});

// Adding a click event to each operation button to display it on the display bar.

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	})
});

// Adding a click event to the equals button to display it on the display bar.

equalsButton.addEventListener('click', button => {
	calculator.compute();
	calculator.updateDisplay();
});

// Adding a click event to the Reset button to display it on the display bar.

allClearButton.addEventListener('click', button => {
	calculator.clear();
	calculator.updateDisplay();
});

// Adding a click event to the delete button to display it on the display bar.

deleteButton.addEventListener('click', button => {
	calculator.delete();
	calculator.updateDisplay();
});


// (--Theme changer section--)

const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const input3 = document.getElementById("input3");
let themeChanger = document.getElementsByClassName('input');

for (let i=0; themeChanger.length > i; i++) {
	themeChanger[i].addEventListener('click', function() {
		let mode = this.dataset.mode;
		console.log('clicked!', mode)
		setTheme(mode);
	})
}

function setTheme(mode) {
	if(mode == 'theme1') {
		document.getElementById('theme-style').href = 'css/style.css';
	}

	if(mode == 'theme2') {
		document.getElementById('theme-style').href = 'css/theme2.css';
	}

	if(mode == 'theme3') {
		document.getElementById('theme-style').href = 'css/theme3.css';
	}
}

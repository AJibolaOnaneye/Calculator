class Calculator{
    constructor(previousOperandTextElment, currentOperandTextElement){
        this.previousOperandTextElment = previousOperandTextElment
        this.currentOperandTextElement = currentOperandTextElement

        // 6 sets to default values as soon as we create a new calculator
        this.clear()
    }

    // 3 => Think about all the operations a calculator can perform
    clear(){
        // clear out our different variables
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        
    }

    delete(){
        // removing a single number 
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        // 10 we want '.' to get added just once
        if(number === '.' && this.currentOperand.includes('.'))return 

        // this is what happens every time a user clicks a number to add to the screen
        // 9 update the currentOperand value and append the number that gets passed to theend of it.
        // Convert to a string just incase it is a number so that we can easily append to  it by using the +
        // Also, because javascript will try to add them as actual numbers e.g 1+1=2 instead of 1+1=11 cuz we want numbers append not added


        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperator(operation){
        // this is what happens when a user clicks on anyone of the operations
        // 14 you must have seen taht if u click an operation, it actually goes through with the computation.. stop that with a check
        if(this.currentOperand === '') return
        // 15 another thing to note about the thr currelntOperand is thst, if we have 2 values and we click an operation, it will do the computation
        // and it also puts all our operands values where they need to be. We need to have another check fot that
        // in essence this to checj=k if hre previous operand already exists before our operand choosing
        if(this.previousOperand !== ''){
            this.compute()
        }  

        // 12 Clearout the currentOperand, put it into the previousOperand and allow us to type a new value
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        // takes our values inside of the calc and compute a single value for what is needed to be displayed on the calc.
        // 17
        let computation //result of our compute fn 

        // number version of our prev, current
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // check if 4 example, the user doesn't enter anything and they click '=', we don't want the code to run
        if(isNaN(prev) || isNaN(current)) return
        // 18
        switch(this.operation) {
            case '+':
                computation = prev + current
            break;
            case '-':
                computation = prev - current
                break;
            case '/':
                computation = prev / current
                break;
            case '*':
                computation = prev * current
                break;
            default:
                return
        }
        // 19 with our computation done,
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay(){
        // updates the value inside of our output
        this.currentOperandTextElement.innerText = this.currentOperand
        // 13 update display for 12
        this.previousOperandTextElment.innerText = this.previousOperand
    }
}
// 4 Wuth our operations all defined, lets think about the different properties our calc need to store.
// we need to know the previousOperandTextlemnt, currentOperandTextElemnt and the operation a user selects.


// 1
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElment = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// 7 Hooking up all of our different variables and making them operate on our calculator object.. this allows us instantiate/use the calcilator object
const calculator = new Calculator(previousOperandTextElment, currentOperandTextElement)

// 8 Add event listener to each buttonand append the innertext(number) on the button
// 8a our dispaly value will be constantly updated everytime we click on a button 

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

// 11 choose the operations variables
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay()
    })
})

// 16 computation
equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
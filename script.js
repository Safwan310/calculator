class Calcy{
    constructor(pre_op, curr_op){
        this.pre_op = pre_op
        this.curr_op = curr_op
        this.clear()

    }
    clear(){
        this.curr = ''
        this.pre = ''
        this.operation = undefined
    }
    delete(){
        this.curr = this.curr.toString().slice(0, -1)
    }
    appendNumber(number){
        if(number==='.' && this.curr.includes('.'))return
        this.curr = this.curr.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.curr === '')return
        if(this.pre !== ''){
            this.compute()
        }
        this.operation = operation
        this.pre = this.curr
        this.curr=''
    }
    compute(){
        let compute 
        const prev = parseFloat(this.pre)
        const current = parseFloat(this.curr)
        if(isNaN(prev)||isNaN(current)) return
        switch(this.operation){
            case '+':
                compute = prev + current
                break
            case '-':
                compute = prev - current
                break
            case '/':
                compute = prev / current
                break
            case '*':
                compute = prev * current
                break
            default:
                return
        }
        this.curr = compute
        this.operation = undefined
        this.pre = ''
    }
    getDisplayNumber(number){
        const stringNUmber = number.toString()
        const intDigits = parseFloat(stringNUmber.split('.')[0])
        const decDigits = stringNUmber.split('.')[1]
        let intDisplay
        if(isNaN(intDigits)){
            intDisplay = ''
        }
        else{
            intDisplay = intDigits.toLocaleString('en',{
                maximumFractionDigits: 0
            })
        }
        if(decDigits!=null){
            return `${intDisplay}. ${decDigits}`
        }
        else{
            return intDisplay
        }
    }
    updateDisplay(){
        this.curr_op.innerText = this.getDisplayNumber(this.curr)
        this.pre_op.innerText = this.pre
        if(this.operation != null){
            this.pre_op.innerText = `${this.getDisplayNumber(this.pre)} ${this.operation}`
        }
        
    }

}

const numButtons  = document.querySelectorAll('[data-number]')
const opnButtons  = document.querySelectorAll('[data-operation]')
const equals = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clear = document.querySelector('[data-clear]')
const pre_op = document.querySelector('[data-pre-op]')
const curr_op = document.querySelector('[data-current-op]')

const calculator = new Calcy(pre_op,curr_op)

numButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

opnButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equals.addEventListener('click',button=>{
    calculator.compute()
    calculator.updateDisplay()
})

clear.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})
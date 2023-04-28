class Calculator {
    static add(number1, number2) {
        return number1 + number2;
    }

    static subtract(number1, number2) {
        return number1 - number2;
    }

    static multiply(number1, number2) {
        return number1 * number2;
    }

    static divide(number1, number2) {
        return number1 / number2;
    }

    static percentage(number1, number2) {
        return (number1 * number2) / 100;
    }

    static squareRoot(number) {
        return Math.sqrt(number);
    }
}

class Operator {
    static Plus = new Operator("+");
    static Minus = new Operator("-");
    static Asterisk = new Operator("*");
    static Divided = new Operator("/");
    static Point = new Operator(".");
    static Percent = new Operator("%");
    static Clear = new Operator("clr");
    static Equals = new Operator("=");
    static SquareRoot = new Operator("√");

    constructor(symbol) {
        this.symbol = symbol;
    }
}

var calculatorScreen = document.getElementById("screen");
const buttons = document.querySelectorAll("button");

class Command {
    constructor(buttons) {
        this.clear = buttons[0];
        this.squareRoot = buttons[1];
        this.percentage = buttons[2];
        this.seven = buttons[3];
        this.eight = buttons[4];
        this.nine = buttons[5];
        this.four = buttons[6];
        this.five = buttons[7];
        this.six = buttons[8];
        this.one = buttons[9];
        this.two = buttons[10];
        this.tree = buttons[11];
        this.zero = buttons[12];
        this.point = buttons[13];
        this.result = buttons[14];
        this.divide = buttons[15];
        this.multiple = buttons[16];
        this.subtract = buttons[17];
        this.sum = buttons[18];

        this.numbers = [this.seven, this.eight, this.nine, this.four, this.five,
        this.six, this.one, this.two, this.tree, this.zero];
    }
}

const command = new Command(buttons);
command.numbers.forEach(item => {
    item.addEventListener("click", () => {
        calculatorScreen.value += item.value;
    });
});

command.clear.addEventListener("click", () => {
    calculatorScreen.value = null;
});

command.sum.addEventListener("click", event => {
    if (isScreenEmpty()) return;
    calculatorScreen.value += Operator.Plus.symbol;
});

command.subtract.addEventListener("click", () => {
    if (isScreenEmpty()) return;
    calculatorScreen.value += Operator.Minus.symbol;
});

command.multiple.addEventListener("click", () => {
    if (isScreenEmpty()) return;
    calculatorScreen.value += Operator.Asterisk.symbol;
});

command.divide.addEventListener("click", () => {
    if (isScreenEmpty()) return;
    calculatorScreen.value += Operator.Divided.symbol;
});

command.point.addEventListener("click", () => {
    if (isScreenEmpty()) return;
    calculatorScreen.value += Operator.Point.symbol;
});

command.result.addEventListener("click", () => {
    if (isScreenEmpty()) return;
    calculatorScreen.value = calculateResult(calculatorScreen.value);
});

command.percentage.addEventListener("click", () => {
    if (isScreenEmpty()) return;
    calculatorScreen.value = percentageResult(calculatorScreen.value);
});

command.squareRoot.addEventListener("click", () => {
    if (isScreenEmpty()) return;
    calculatorScreen.value = calculateSquareRoot(calculatorScreen.value);
});

function isScreenEmpty() {
    return calculatorScreen.value === "" ? true : false;
}

function calculateResult(values) {
    if (isMoreThanOneOperator(values))
        return eval(values.toString());

    let result = 0;
    if (values.includes(Operator.Plus.symbol))
        result = sumCalculator(values);
    else if (values.includes(Operator.Minus.symbol))
        result = subtractCalculator(values);
    else if (values.includes(Operator.Asterisk.symbol))
        result = multiplyCalculator(values);
    else if (values.includes(Operator.Divided.symbol))
        result = divideCalculator(values);

    return result;
}

function isMoreThanOneOperator(values) {
    const operator = Object.values(Operator);

    let count = 0;
    for (let i = 0; i < operator.length; i++) {
        if (values.includes(operator[i].symbol))
            count++;
    }

    return count > 1;
}

function percentageResult(values) {
    let result = 0;
    result = calculatePercentage(values);
    return result;
}

function sumCalculator(values) {
    var array = values.split("+");
    const numberArray = array.map(Number);

    return numberArray.reduce((sum, i) => {
        return Calculator.add(sum, i);
    });
}

function subtractCalculator(values) {
    const array = values.split("-");
    const numberArray = array.map(Number);

    return numberArray.reduce((sub, i) => {
        return Calculator.subtract(sub, i);
    });
}

function multiplyCalculator(values) {
    const array = values.split("*");
    const numberArray = array.map(Number);

    return numberArray.reduce((mult, i) => {
        return Calculator.multiply(mult, i);
    });
}

function divideCalculator(values) {
    const array = values.split("/");
    const numberArray = array.map(Number);

    return numberArray.reduce((divide, i) => {
        return Calculator.divide(divide, i);
    });
}

function calculatePercentage(values) {
    const array = values.split("*");
    const numberArray = array.map(Number);

    return numberArray.reduce((perc, i) => {
        return Calculator.percentage(perc, i);
    });
}

function calculateSquareRoot(value) {
    return Calculator.squareRoot(value);
}
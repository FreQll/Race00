class Calculator {
    operatorsArr = ['+', '-', '*', '/'];

    constructor() {
        this.string = '0';
        this.expression = [];
        this.numberStr = '0';
        this.result = 0;
        this.toClear = false;

        document.getElementById("result_area").innerText = '0';
        document.getElementById("expression_string").innerText = '';
    }

    appendNumber(number) {
        if (this.toClear) this.clear(); //очищение после предыдущего результата и вводом нового выражения
        this.toClear = false;

        if (this.string.length == 1 && this.string[0] == '0') this.string = '';

        if (this.expression.length == 1 && this.expression[0] == '0') this.expression.pop();

        //if (this.numberStr[0] == '0' && !(this.string.includes('.'))) return; //игнорирование чисел типа 01

        if (this.expression[this.expression.length - 1] == '-') { //замена -num на + -num
            this.expression.pop();
            this.expression.push('+');
            this.numberStr += '-';
        }

        if (this.expression.length > 2 && !this.operatorsArr.includes(this.expression[this.expression.length - 1])) {
            this.string = this.string.split() + number.toString();
            number = this.expression[this.expression.length - 1] + number;
            this.expression.pop();
        }
        else this.string += number.toString();

        if (this.string.length > 13) {
            document.getElementById("result_area").style.fontSize = '20px';
        }
        else document.getElementById("result_area").style.fontSize = '30px';
        
        document.getElementById("result_area").innerText = this.string;
        document.getElementById("result_div").scrollTop = document.getElementById("result_div").scrollHeight;

        this.numberStr += number;
        //console.log()
    }

    appendOperation(operator) {
        if (this.numberStr[this.numberStr.length - 1] == '.') this.return; //для случаев ввода чисел типа 1.
        if (this.numberStr.toString() != '') this.expression.push(this.numberStr);
        this.numberStr = '';

        /*if (this.result != 0 && this.expression.length < 2) {
            document.getElementById("expression_string").innerText = document.getElementById("expression_string").textContent + ' ' + this.result;
            this.expression.push(this.result);
        }*/
        this.toClear = false;

        if (this.operatorsArr.includes(this.expression[this.expression.length - 1])) { //если оператор уже введен
            this.expression.pop();
            this.string = this.string.substring(0, this.string.length - 2);
            //this.string = this.expression.join(' ');
        }

        this.string += ' ' + operator + ' ';
        document.getElementById("result_area").innerText = this.string;

        this.expression.push(operator);

        console.log(this.expression);

        document.getElementById("result_div").scrollTop = document.getElementById("result_div").scrollHeight;
    }

    appendPoint() {
        if (this.toClear) this.clear(); //очищение после предыдущего результата и вводом нового выражения
        this.toClear = false;
        if (this.numberStr.toString().includes('.')) return;

        if (this.numberStr == '') {
            this.string += '0';
            this.numberStr += '0';
        }
        this.numberStr += '.';
        this.string += '.';
        document.getElementById("result_area").innerText = this.string;

        console.log(this.expression);

        document.getElementById("result_div").scrollTop = document.getElementById("result_div").scrollHeight;

    }

    appendPercent() {
        if (this.numberStr != '') this.expression.push(this.numberStr);

        if (this.operatorsArr.includes(this.expression[this.expression.length - 1])) return;

        let num = this.numberStr.toString();
        if (num[0] == '-') num = num.substring(1, num.length);
        let res = num / 100;

        this.numberStr = this.numberStr.toString();
        if (this.numberStr[0] == '-') this.numberStr = '-' + res;
        else this.numberStr = res;

        this.expression.pop();

        this.string = this.string.toString();
        while(!this.operatorsArr.includes(this.string[this.string.length - 1]) && this.string.length > 0) {
            this.string = this.string.toString().substring(0, this.string.length - 1);
        }

        this.string += ' ' + res;
        this.result = 0;

        document.getElementById("result_area").innerText = this.string;
        document.getElementById("result_div").scrollTop = document.getElementById("result_div").scrollHeight;
    }


    appendSign() {
        if (this.numberStr == '' || this.numberStr == 0) return;

        console.log(this.string)
        if (!this.string.includes('+') && !this.string.includes('-') && !this.string.includes('/') && !this.string.includes('*')) {
            console.log(this.string)
        
            this.numberStr *= -1;
            this.string = this.numberStr;
        }
        else if (this.numberStr < 0) {
            this.numberStr *= -1;
            while(!this.operatorsArr.includes(this.string[this.string.length - 1]) && this.string.length > 0) {
                this.string = this.string.toString().substring(0, this.string.length - 1);
            }
            this.string = this.string.toString().substring(0, this.string.length - 1);
            this.string += ' + ' + this.numberStr;
        }
        else if (this.numberStr > 0) {
            while(!this.operatorsArr.includes(this.string[this.string.length - 1]) && this.string.length > 0) {
                this.string = this.string.toString().substring(0, this.string.length - 1);
            }
            this.string = this.string.toString().substring(0, this.string.length - 1);
            console.log(this.string)
            this.string += '- ' + this.numberStr;
            this.numberStr *= -1;
        }

        document.getElementById("result_area").innerText = this.string;
        console.log(this.expression)

        document.getElementById("result_div").scrollTop = document.getElementById("result_div").scrollHeight;
    }

    appendEqual() {
        console.log(this.expression)
        if (this.expression.length < 2) return; //проверка выражения на одно число
        
        if (this.numberStr == '' && this.expression.length < 3) return; //проверка на выражение типа 5/
        
        if (this.numberStr != '') this.expression.push(this.numberStr);
        
        if (this.expression[this.expression.length - 2] == '/') //деление на ноль
            if (this.expression[this.expression.length - 1] == 0) {
                this.expression.pop();
                return;
            }

        document.getElementById("expression_string").innerText = this.string + " =";
        this.updateResult();
        document.getElementById("result_area").innerText = this.result;

        if (document.getElementById("expression_string").innerText.length > 13) document.getElementById("expression_string").style.fontSize = '20px';
        else document.getElementById("expression_string").style.fontSize = '30px';

        this.toClear = true;
        this.expression = [];
        this.numberStr = this.result;

        document.getElementById("result_div").scrollTop = document.getElementById("result_div").scrollHeight;
    }

    appendDelete() {
        if (this.numberStr != '') this.expression.push(this.numberStr);

        let lastNum = '';
        if (this.operatorsArr.includes(this.expression[this.expression.length - 1])) {
            console.log(this.expression);
            this.expression.pop();
            this.string = this.string.substring(0, this.string.length - 3);
        }
        else {
            lastNum = this.expression[this.expression.length - 1];
            this.expression.pop();
            if (this.expression.length == 0) this.expression.push('0');

            lastNum = lastNum.toString().substring(0, lastNum.toString().length - 1)

            if (lastNum == '-') lastNum = '';
            //this.numberStr = this.numberStr.substring(0, this.numberStr.length - 1);
            this.string = this.string.substring(0, this.string.length - 1);
            //this.expression.push(lastNum);
        }

        if (this.string.length == 0) this.string = '0';
        
        if (this.string.length > 13) document.getElementById("result_area").style.fontSize = '20px';
        else document.getElementById("result_area").style.fontSize = '30px';
        
        this.numberStr = lastNum;
        document.getElementById("result_area").innerText = this.string;

        document.getElementById("result_div").scrollTop = document.getElementById("result_div").scrollHeight;
    }

    clear() {
        this.expression = [];
        document.getElementById("result_area").innerText = '0';

        if (this.string == "0") document.getElementById("expression_string").innerText = ""; //очищение истории
        else if (this.result != 0)
            document.getElementById("expression_string").innerText = document.getElementById("expression_string").textContent + ' ' + this.result;
        
        document.getElementById("result_area").style.fontSize = '30px';
        document.getElementById("result_div").scrollTop = document.getElementById("result_div").scrollHeight;
        
        this.result = 0;
        this.string = "0";
        this.numberStr = "0"
    }

    updateResult() {
        if (!(this.expression.includes('+') || this.expression.includes('-')
            || (this.expression.includes('*') || this.expression.includes('/')))) return;
        
        let array = this.expression;
        let tempRes = parseFloat(array[0]);
        let operator = "";

        console.log(this.expression);

        while (this.expression.length != 1) {
            let indDiv = this.expression.indexOf("/");
            let indMult = this.expression.indexOf("*");

            if ((indDiv < indMult && indDiv != -1) || (indDiv != -1 && indMult == -1)) {
                this.calculate("/");
                console.log(this.expression);
                continue;
            }

            if ((indMult < indDiv && indMult != -1) || (indMult != -1 && indDiv == -1)) {
                this.calculate("*");
                console.log(this.expression);
                continue;
            }

            if (this.expression.indexOf("+") != -1) {
                this.calculate("+");
                console.log(this.expression);
            }
        }

        tempRes = this.expression[0];


        this.result = tempRes;
        this.string = tempRes.toString();
        this.expression = [];
        this.numberStr = "";
        this.expression.push(tempRes);
    }


    calculate(operator) {

        let startInd = this.expression.indexOf(operator) - 1;
        let endInd = this.expression.indexOf(operator) + 1;
        let res;
        
        switch (operator) {
            case ("+"): 
                res = parseFloat(this.expression[startInd]) + parseFloat(this.expression[endInd]);
                break;
            case ("-"): 
                res = parseFloat(this.expression[startInd]) - parseFloat(this.expression[endInd]);
                break;
            case ("*"): 
                res = parseFloat(this.expression[startInd]) * parseFloat(this.expression[endInd]);
                break;
            case ("/"): 
                res = parseFloat(this.expression[startInd]) / parseFloat(this.expression[endInd]);
                break;
        }
        this.expression.splice(startInd, endInd - startInd + 1, res);
    }

    expressionToString() {
        this.string = '';
        for (let i = 0; i < this.expression.length; i++) {
            const element = this.expression[i];

            if (parseFloat(this.expression[i + 1]) < 0) this.string += ' - ';
            else if (parseFloat(element) < 0) {
                let num = parseFloat(element) * (-1);
                this.string += num.toString;
            }
            else this.string += element;
        }
        document.getElementById("result_area").innerText = this.string;

    }

    //////////////CREATIVE

    factorial() {
        if (this.numberStr == '' || parseFloat(this.numberStr) < 0) return;
        this.expression.push(this.numberStr);

        let res = 1;

        for (let i = 1; i <= parseFloat(this.numberStr); i++) {
            res *= i;
        }

        this.numberStr = res;

        this.expression.pop();
        this.expression.push(res);

        console.log(this.expression);
        this.expressionToString();
        this.expression.pop();
    }

}

calculator = new Calculator();

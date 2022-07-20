import { Component, OnInit } from '@angular/core';
import { WriteLogService } from '../write-log.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  input: string = '';
  currentEntry: string = '0';
  prevOperation: string = '';
  hasDecimal: boolean = false;
  clearNext: boolean = false;
  operandPressedLast: boolean = false;

  trimDecimal() {
    /*Lops off trailing decimal*/
    if(this.currentEntry[this.currentEntry.length - 1] == '.') {
      this.currentEntry = this.currentEntry.substr(0, this.currentEntry.length - 1);
    }
  }

  calculateAnswer() {
    let answer = this.input;

    //Check to see if last char of answer is a number or not
    if ( isNaN( parseInt(answer[answer.length-1]) ) ){
      answer = answer.substr(0, answer.length-1);
    }

    this.logging.writeLog('Formula = ' + answer);

    this.currentEntry = eval(answer);
  }

  clearAll() {
    this.logging.writeLog('Clear all succeeded.');

    this.input = '';
    this.currentEntry = '0';
    this.prevOperation = '';
    this.hasDecimal = false;
    this.clearNext = false;
    this.operandPressedLast = false;
  }

  onClickNumber(num: string) {
    if(this.clearNext == true) {
      this.clearAll();
      this.clearNext = false;
    }

    if(this.operandPressedLast == true) {
      this.currentEntry = "0";
      this.operandPressedLast = false;
    }

    if (this.currentEntry == '0' ) {
      if (num == "0") {
        return;
      }

      if (num != '.') {
        this.currentEntry = num;
        return;
      }
    }

    if (num == ".") {
      if (this.hasDecimal == true) {
        this.logging.writeError('This number already has a decimal.');
        return;
      } else {
        this.hasDecimal = true;
      }
    }

    this.currentEntry += num;
  }

  onClickOperator(operand: string) {
    if (operand == "neg") {
      this.currentEntry = (parseFloat(this.currentEntry)*-1).toString();

      if(this.currentEntry.indexOf('.') == -1) {
        this.hasDecimal = false;
      } else {
        this.hasDecimal = true;
      }
      return;
    }

    if (this.input.length > 0) {
      if ((operand == "/") && (this.currentEntry == "0")) {
        this.logging.writeError('Cannot divide by 0.');
        return;
      }
    }

    if(this.clearNext == true) {
      this.input = '';
      this.clearNext = false;
    }

    this.hasDecimal = false;

    if(this.operandPressedLast == true) {
      return;
    }

    this.trimDecimal();

    this.input = this.input + this.currentEntry + operand;
    this.operandPressedLast = true;
  }

    onClickCalculate() {
    this.trimDecimal();
    this.hasDecimal = false;

    if (this.input != '') {
      if ((this.input[this.input.length-1] == "/") && (this.currentEntry == "0")) {
        this.logging.writeError('Cannot divide by 0.');
        return;
      }
    }

    if(this.clearNext == true) {
      if (this.prevOperation != '') {
        this.input = this.currentEntry + this.prevOperation; 
      } else {
        return;
      }
    } else {
      if (this.input.length > 0) {
        this.prevOperation = this.input[this.input.length - 1] + this.currentEntry;
      }
      this.logging.writeLog('Previous Operation: ' + this.prevOperation);
      this.input = this.input + this.currentEntry;
    }

    this.calculateAnswer();
    this.clearNext = true;
  }

  onClickClearEntry() {
    this.logging.writeLog('Entry cleared successfully');
    this.hasDecimal = false;

    this.currentEntry = '0';
  }

  onClickClearAll() {
    this.clearAll();
  }

  constructor(
    private logging: WriteLogService
  ) {
  }

  ngOnInit(): void {
  }

}

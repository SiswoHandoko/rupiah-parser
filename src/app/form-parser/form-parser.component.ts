import { Component, OnInit } from '@angular/core';
import { FormParser } from './form-parser';

@Component({
  selector: 'app-form-parser',
  templateUrl: './form-parser.component.html',
  styleUrls: ['./form-parser.component.css']
})
export class FormParserComponent implements OnInit {

  constructor() { }
  /* rupiah fractions */
  rupiah = [100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 100, 50];
  model = new FormParser('');
  parsedData = [];
  submitted = false;
  validate = {
    'status': true,
    'message': ''
  };

  ngOnInit() {
  }

  onSubmit() {
    const res = this.validateAmount(this.model.input);
    if (res.status) {
      /* Prepare amount and convert to int from string */
      let amount = parseInt(res.amount.replace(/\D/g, ''));
      const result = [];
      let i = 0;
      let stop = false;

      /* Parse Function For Separate Amount */
      while ( !stop && amount !== 0) {
        const rupiah = this.rupiah[i];
        if ( amount === rupiah) {
          result.push('1 x ' + rupiah);
          amount = 0;
          stop = true;
        } else if (amount > 100000) {
          const multiplier = Math.floor(amount / rupiah);
          result.push(multiplier.toString() + ' x ' + rupiah);
          amount = amount % rupiah;
        } else if (amount > 20000 && amount > rupiah) {
          const multiplier = Math.floor(amount / rupiah);
          result.push(multiplier.toString() + ' x ' + rupiah);
          amount = amount % rupiah;
        } else if (amount > 2000 && amount > rupiah) {
          const multiplier = Math.floor(amount / rupiah);
          result.push(multiplier.toString() + ' x ' + rupiah);
          amount = amount % rupiah;
        } else if (amount % rupiah !== 0 && amount > rupiah && amount > 500) {
          result.push('1 x ' + rupiah);
          amount = amount % rupiah;
        } else if (amount >= rupiah && amount < 500) {
          const multiplier = Math.floor(amount / rupiah);
          result.push(multiplier.toString() + ' x ' + rupiah);
          amount = amount % rupiah;
        } else if (amount < 50) {
          result.push('left ' + amount + ' (no available fraction)');
          stop = true;
        }
        i++;
      }
      this.validate.status = true;
      this.validate.message = '';
      this.parsedData = result;
      this.submitted = true;
    } else {
      this.parsedData = [];
      this.submitted = true;
    }
  }

  validateAmount(amount) {
    /* Trim Remove Whitespace on end and start of amount */
    let result = {};
    amount = amount.trim();
    /* Validate Required */
    if (amount === '' || amount === undefined || amount === null) {
      this.validate.status = false;
      this.validate.message = 'Error Input';
      return result = {
        'status': false,
        'amount': amount
      };
    } else if (amount.includes(',')) {
      /* If amount , is not ,00 */
      if (amount.slice(-3) !== ',00') {
        this.validate.status = false;
        this.validate.message = 'invalid separator';
        return result = {
          'status': false,
          'amount': amount
        };
      }
      return result = {
        'status': true,
        'amount': amount.substring(0, amount.length - 3)
      };
    } else if (amount === 'Rp') {
      /* If amount is Rp only */
      this.validate.status = false;
      this.validate.message = 'missing value';
      return result = {
        'status': false,
        'amount': amount
      };
    } else if (isNaN(parseInt(amount[amount.length - 1]))) {
      /* If Last Char is character or NaN */
      this.validate.status = false;
      this.validate.message = 'valid character in wrong position';
      return result = {
        'status': false,
        'amount': amount
      };
    } else if (amount.includes(' ')) {
      amount = amount.replace(/\s/g, ' ');
      if ((!isNaN(parseInt(amount[3])) || !isNaN(parseInt(amount[4]))) && (amount.substring(0, 3) === 'Rp.' || amount.substring(0, 3) === 'Rp ')) {
        return result = {
          'status': true,
          'amount': amount
        };
      } else {
        /* If Amount have a whitespace on middle of string */
        this.validate.status = false;
        this.validate.message = 'invalid separator';

        return result = {
          'status': false,
          'amount': amount
        };
      }
    } else {
      return result = {
        'status': true,
        'amount': amount
      };
    }
  }
  resetParser() {
    this.validate.status = true;
    this.validate.message = '';
    this.submitted = false;
    this.model = new FormParser( '');
  }

}

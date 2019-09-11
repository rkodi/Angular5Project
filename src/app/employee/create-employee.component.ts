import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { Percentage } from './models/percentage.model';
import { percentageList } from './services/percentage-list';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {


  employeeForm: FormGroup;
  public method1: Percentage[] = percentageList;
  public method2: Percentage[] = percentageList;
  public method3: Percentage[] = percentageList;
  public methodTotal: number = 0;
  fullNameLength = 0;
  amountUnmask = /[^\d.-]/g
  amountMask = Object.freeze({
    mask: createNumberMask({
      // allowDecimal: true,
      // decimalSymbol: '.',
      integerLimit: 11,
      prefix: '$',
      suffix: '.00',
      thousandsSeparatorSymbol: ','

    })
  });

  formErrors = {
    'fullName': '',
    'email': '',
    'confirmEmail': '',
    'emailGroup': '',
    'amountGroup': '',
    'phone': '',
    'annualCreditCardSales': '',
    'typicalSalesAmount': '',
    'anticipatedHighestTicket': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };

  // This object contains all the validation messages for this form
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 5 characters.',
      'maxlength': 'Full Name must be less than 15 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Should be @test.com'
    },
    'confirmEmail': {
      'required': 'Confirm Email is required.'
    },
    'emailGroup': {
      'emailMismatch': 'Email and Confirm email dose not match.'
    },
    'amountGroup': {

      // 'compareLessThanAnnualAmount2': 'thirdAmount can not be dreater than Compare.',

    },
    'phone': {
      'required': 'Phone number is required.'
    },
    'annualCreditCardSales': {
      'required': 'Annual Amount is required.',
      'min': 'Amount must be greater than 999 .',
      'max': 'Amount must be less than 1,000,000,000.',
      'annualCreditCardSalesMinMax': 'Must be 999 > or <100000000 max',
      'annualCreditCardSalesMinMax1': 'Must be 999 or 100000000'
    },
    'typicalSalesAmount': {
      'required': 'Typical Amount is required.',
      'typicalSalesAmountAmountMinMax': 'Compare Must be less than 50,000.',
      // 'compareLessThanAnnualAmount1': 'Compare Amount can not be greater than Annual Amount.'
    },
    'anticipatedHighestTicket': {
      'required': 'Anticipate Amount is required.',
      'anticipatedHighestTicketMinMax': 'Third Amount Must be less than 100,000,000.',
    },
    'skillName': {
      'required': 'Skill Name is required.',
    },
    'experienceInYears': {
      'required': 'Experience is required.',
    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  };


  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.employeeForm = this.fb.group({
      fullName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [
          Validators.required,
          CustomValidators.emailDomain('test.com')]],
        confirmEmail: ['', Validators.required]
      }, { validator: matchEmail }),
      phone: [''],
      annualCreditCardSales: ['', [
        Validators.required,
        CustomValidators.annualCreditCardSalesMinMax1]],
      typicalSalesAmount: ['', [
        Validators.required,
        CustomValidators.typicalSalesAmountMinMax]],
      anticipatedHighestTicket: ['', [
        Validators.required,
        CustomValidators.anticipatedHighestTicketMinMax]],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
      }),
      method1: [this.method1[0], [Validators.required]],
      method2: [this.method2[0], [Validators.required]],
      method3: [this.method3[0], [Validators.required]],
      methodTotal: ['', [Validators.required]]
    }, { validator: compareLessThanAnnual1 });

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPreferenceChange(data);
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    // this.employeeForm.get('fullName').valueChanges.subscribe((value: string) => {
    //   this.fullNameLength = value.length;
    // });
  }

  matchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const fromValue = control.value;
    if (this.employeeForm) {
      const toValue = (<FormGroup>this.employeeForm.get('group1')).get('field').value;
      if (fromValue <= toValue) {
        console.log('Control: ', control);
        return { 'fieldMatch': true };
      }
      console.log('Control: ', control);
      return null;
    }
  }

  get group2Field() {
    return (<FormGroup>this.employeeForm.get('group2')).get('field');
  }



  onContactPreferenceChange(selectedValue: string) {
    const phoneControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneControl.setValidators([Validators.required, Validators.minLength(10)]);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();

  }



  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        // console.log(messages);
        // console.log(abstractControl.errors);

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }

      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

      // console.log('key= ' + key + ' Value =' + abstractControl.value);

    });
  }

  checkValuesTypicalSalesAmount() {

    if (((this.formErrors.amountGroup != 'undefined ') && (this.formErrors.typicalSalesAmount || this.formErrors.amountGroup))) {
      return true;
    }
    else {

      let typicalSalesAmountchk = Number(this.employeeForm.value.typicalSalesAmount);
      let annualCreditCardSaleschk = Number(this.employeeForm.value.annualCreditCardSales);

      if (typicalSalesAmountchk && this.formErrors.amountGroup == 'undefined') {
        if (annualCreditCardSaleschk <= typicalSalesAmountchk) {
          return true;
        }
      }
      else {

        if (annualCreditCardSaleschk && typicalSalesAmountchk) {
          if (annualCreditCardSaleschk <= typicalSalesAmountchk) {
            return true;
          }
        }


        return false;
      }

    }

  }

  checkValuesAnticipatedHighestTicket() {


    if (((this.formErrors.amountGroup != 'undefined ') && (this.formErrors.anticipatedHighestTicket || this.formErrors.amountGroup))) {
      return true;
    }
    else {

      let annualCreditCardSaleschk = Number(this.employeeForm.value.annualCreditCardSales);
      let typicalSalesAmountchk = Number(this.employeeForm.value.typicalSalesAmount);
      let anticipatedHighestTicketchk = Number(this.employeeForm.value.anticipatedHighestTicket);



      if ((anticipatedHighestTicketchk && this.formErrors.amountGroup == 'undefined ')) {
        if (typicalSalesAmountchk >= anticipatedHighestTicketchk) {
          return true;
        }
      }
      else {

        if (anticipatedHighestTicketchk && typicalSalesAmountchk) {
          if (typicalSalesAmountchk >= anticipatedHighestTicketchk) {
            return true;
          }
          else if (annualCreditCardSaleschk <= anticipatedHighestTicketchk) {
            return true;
          }
        }


        return false;
      }

    }

  }

}

function matchEmail(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if (emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine) {
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}

function compareLessThanAnnual(group: AbstractControl): { [key: string]: any } | null {
  const annualControl = group.get('annualCreditCardSales');
  const compareControl = group.get('typicalSalesAmount');

  if (Number(annualControl.value) > Number(compareControl.value) || annualControl.pristine || compareControl.pristine) {
    return null;
  } else {
    return { 'compareLessThanannualCreditCardSales': true };
  }
}

const compareLessThanAnnual1: ValidatorFn = (fg: FormGroup) => {
  const annualControl1 = fg.get('annualCreditCardSales').value;
  const compareControl1 = fg.get('typicalSalesAmount').value;
  const thirdControl1 = fg.get('anticipatedHighestTicket').value;
  if (Number(annualControl1) > Number(compareControl1) || annualControl1 === '' || compareControl1 === '' || compareControl1.pristine) {
    return null;
  } else

    return { 'compareLessThanannualCreditCardSales1': true };
  // return { 'compareLessThanAnnualAmount2': true };
}



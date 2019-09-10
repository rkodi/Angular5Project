import { Percentage } from './models/percentage.model';
import { percentageList } from './services/percentage-list';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {


  employeeForm: FormGroup;
  fullNameLength = 0;
  public method1: Percentage[] = percentageList;
  public method2: Percentage[] = percentageList;
  public method3: Percentage[] = percentageList;
  public methodTotal: number = 0;
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
    'annualAmount': '',
    'compareAmount': '',
    'thirdAmount': '',
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
      'compareLessThanAnnualAmount1': 'Compare Amount can not be greater than Annual Amount.',
      'compareLessThanAnnualAmount2': 'thirdAmount can not be dreater than Compare.',

    },
    'phone': {
      'required': 'Phone number is required.'
    },
    'annualAmount': {
      'required': 'Annual Amount is required.',
      'min': 'Amount must be greater than 999 .',
      'max': 'Amount must be less than 1,000,000,000.',
      'annualAmountMinMax': 'Must be 999 or 100000000 max',
      'annualAmountMinMax1': 'Must be 999 or 100000000 max1'
    },
    'compareAmount': {
      'required': 'Compare Amount is required.',
      'compareAmountMinMax': 'Compare Must be less than 50,000.'
    },
    'thirdAmount': {
      'required': 'Third Amount is required.',
      'compareAmountMinMax': 'Third Amount Must be less than 50,000.',
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


  constructor(
    private fb: FormBuilder,
    private element: ElementRef,
    ) { }

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
      amountGroup: this.fb.group({
        annualAmount: ['', [
          Validators.required,
          CustomValidators.annualAmountMinMax1]],
        compareAmount: ['', [
          Validators.required,
          CustomValidators.compareAmountMinMax]],
        thirdAmount: ['', [
          Validators.required,
          CustomValidators.compareAmountMinMax]],
      }, { validator: compareLessThanAnnual1 }),
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
      }),
        method1: [this.method1[0],[Validators.required]],
        method2: [this.method2[0],[Validators.required]],
        method3: [this.method3[0],[Validators.required]],
        methodTotal: ['',[Validators.required]]
    });

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
        console.log(messages);
        console.log(abstractControl.errors);

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

    this.employeeForm.get('methodTotal').valueChanges.subscribe((value: any) => {
      console.log(value);
    })
  }

  setTotalValue() {
    this.calculateTotalValue()
    console.log(this.calculateTotalValue);
  }

  calculateTotalValue() {
    this.methodTotal = Number(this.employeeForm.get('method1').value.value) + Number(this.employeeForm.get('method2').value.value) + Number(this.employeeForm.get('method3').value.value);
    console.log(this.methodTotal);
  }

  onLoadDataClick(): void {

    const formArray = new FormArray([
      new FormControl('John', Validators.required),
      new FormGroup({
        country: new FormControl('', Validators.required)
      }),
      new FormArray([])
    ]);

    console.log(formArray.length);

    for (const control of formArray.controls) {
      if (control instanceof FormControl) {
        console.log('Control is FormControl');
      }
      if (control instanceof FormGroup) {
        console.log('Control is FormGroup');
      }
      if (control instanceof FormArray) {
        console.log('Control is FormArray');
      }
    }
    // this.logValidationErrors(this.employeeForm);
    // console.log(this.formErrors);
  }
  onSubmit(): void {
    console.log(this.employeeForm.dirty);
    console.log(this.employeeForm.value);

    console.log(this.employeeForm.controls.fullName.touched);
    console.log(this.employeeForm.get('fullName').value);
  }

  continue() {
    this.employeeForm.get('fullName').markAsTouched();
    // this.employeeForm.get('email').markAsTouched();
    // this.employeeForm.get('confirmEmail').markAsTouched();
    // this.employeeForm.get('annualAmount').markAsTouched();
    // this.employeeForm.get('compareAmount').markAsTouched();
    // this.employeeForm.get('thirdAmount').markAsTouched();
    // this.employeeForm.get('skillName').markAsTouched();
    // this.employeeForm.get('experienceInYears').markAsTouched();

  //   if (this.employeeForm.valid && this.methodTotal === 100) {
  //     console.log('validation success')
  //   }else {

  //     const invalidElements = this.element.nativeElement.querySelectAll('input.ng-invalid');
  //     if(invalidElements.length > 0) {
  //       invalidElements[0].focus();
  //     }
  //   }
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
  const annualControl = group.get('annualAmount');
  const compareControl = group.get('compareAmount');

  if (Number(annualControl.value) > Number(compareControl.value) || annualControl.pristine || compareControl.pristine) {
    return null;
  } else {
    return { 'compareLessThanAnnualAmount': true };
  }
}

const compareLessThanAnnual1: ValidatorFn = (fg: FormGroup) => {
  const annualControl1 = fg.get('annualAmount').value;
  const compareControl1 = fg.get('compareAmount').value;
  const thirdControl1 = fg.get('thirdAmount').value;
  if (Number(annualControl1) > Number(compareControl1) || annualControl1 === '' || compareControl1 === '' || compareControl1.pristine) {
    return null;
  } else

    return { 'compareLessThanAnnualAmount1': true };
  // return { 'compareLessThanAnnualAmount2': true };
}




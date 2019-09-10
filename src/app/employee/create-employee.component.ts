import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {


  employeeForm: FormGroup;
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

      // 'compareLessThanAnnualAmount2': 'thirdAmount can not be dreater than Compare.',

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
      'compareAmountMinMax': 'Compare Must be less than 50,000.',
      // 'compareLessThanAnnualAmount1': 'Compare Amount can not be greater than Annual Amount.'
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
      })
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


  // this.employeeForm = new FormGroup({
  //   fullName: new FormControl(),
  //   email: new FormControl(),
  //   skills: new FormGroup({
  //     skillName:new FormControl(),
  //     experienceInYears:new FormControl(),
  //     proficiency:new FormControl()
  //   })
  // });
  // }

  onLoadDataClick(): void {

    this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors);

    // const formArray = new FormArray([
    //   new FormControl('John', Validators.required),
    //   new FormGroup({
    //     country: new FormControl('', Validators.required)
    //   }),
    //   new FormArray([])
    // ]);

    // const formArray1 = this.fb.array([
    //   new FormControl('John', Validators.required),
    //   new FormControl('IT', Validators.required),
    //   new FormControl('', Validators.required),

    // ]);

    // console.log(formArray1.value);
    // for formArray output
    // console.log(formArray.length);

    // for (const control of formArray.controls) {
    //   if(control instanceof FormControl) {
    //     console.log('Control is FormCotrol')
    //   }
    //   if(control instanceof FormGroup) {
    //     console.log('Control is FormGroup')
    //   }
    //   if(control instanceof FormArray) {
    //     console.log('Control is FormArray')
    //   }
    // }


    // this.employeeForm.patchValue({
    //   fullName: 'Ravi Kodi',
    //   email: 'ravi@mail.com',
    //   skills: {
    //     skillName: 'Angular',
    //     experienceInYears: 3,
    //     proficiency: 'beginner'
    //   }
    // })
  }
  onSubmit(): void {
    // console.log(this.employeeForm.dirty);
    console.log(this.employeeForm.value);

    // console.log(this.employeeForm.controls.fullName.touched);
    // console.log(this.employeeForm.get('fullName').value);
  }


  checkValuesCompareAmount() {

    if (((this.formErrors.amountGroup != 'undefined ') && (this.formErrors.compareAmount || this.formErrors.amountGroup))) {
      return true;
    }
    else {

      let CompareAmountchk = Number(this.employeeForm.value.amountGroup.compareAmount);
      let AnnualAmountchk = Number(this.employeeForm.value.amountGroup.annualAmount);

      if (CompareAmountchk && this.formErrors.amountGroup == 'undefined ') {
        if (AnnualAmountchk <= CompareAmountchk) {
          return true;
        }
      }
      else {

        if (AnnualAmountchk && CompareAmountchk) {
          if (AnnualAmountchk <= CompareAmountchk) {
            return true;
          }
        }


        return false;
      }

    }

  }

  checkValuesthirdAmount() {


    if (((this.formErrors.amountGroup != 'undefined ') && (this.formErrors.thirdAmount || this.formErrors.amountGroup))) {
      return true;
    }
    else {

      let CompareAmountchk = Number(this.employeeForm.value.amountGroup.compareAmount);
      let ThirdAmountchk = Number(this.employeeForm.value.amountGroup.thirdAmount);



      if ((ThirdAmountchk && this.formErrors.amountGroup == 'undefined ')) {
        if (CompareAmountchk >= ThirdAmountchk) {
          return true;
        }
      }
      else {

        if (ThirdAmountchk && CompareAmountchk) {
          if (CompareAmountchk >= ThirdAmountchk) {
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



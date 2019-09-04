import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
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
    'phone': '',
    'annualAmount': '',
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
    'phone': {
      'required': 'Phone number is required.'
    },
    'annualAmount': {
      'required': 'Amount is required.',
      'min': 'Amount must be greater than 999 .',
      'max': 'Amount must be less than 1,000,000,000.',
      'annualAmountMinMax': 'Must be 999 or 100000000',
      'annualAmountMinMax1': 'Must be 999 or 100000000'
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
      }, {validator: matchEmail}),
      phone: [''],
      annualAmount: ['', [
        Validators.required, 
        CustomValidators.annualAmountMinMax,
        CustomValidators.annualAmountMinMax1]],
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

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }

      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } 
       
        console.log('key= ' + key + ' Value =' + abstractControl.value);
      
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

    const formArray = new FormArray([
      new FormControl('John', Validators.required),
      new FormGroup({
        country: new FormControl('', Validators.required)
      }),
      new FormArray([])
    ]);

    const formArray1 = this.fb.array([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('', Validators.required),
      
    ]);

    console.log(formArray1.value);
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
    // this.logValidationErrors(this.employeeForm);
    // console.log(this.formErrors);

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
    console.log(this.employeeForm.dirty);
    console.log(this.employeeForm.value);

    console.log(this.employeeForm.controls.fullName.touched);
    console.log(this.employeeForm.get('fullName').value);
  }

}

function matchEmail(group: AbstractControl): {[key: string]: any} | null {
  const emailControl =  group.get('email');
  const confirmEmailControl =  group.get('confirmEmail');

  if(emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine) {
    return null;
  } else {
    return { 'emailMismatch': true};
  }
}



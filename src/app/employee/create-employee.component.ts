import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;

  formErrors = {
    'fullName': '',
    'email': '',
    'phone': '',
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
      'emailDomain': 'Should be @mail.com'
    },
    'phone': {
      'required': 'Phone number is required.'
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
      fullName: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(15)]],
      contactPreference: ['email'],
      email: ['',[Validators.required, emailDomain]],     
      phone: [''],
      skills: this.fb.group({
        skillName: ['',Validators.required],
        experienceInYears: ['',Validators.required],
        proficiency: ['',Validators.required]
      }),
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPreferenceChange(data);
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });
  }

  onContactPreferenceChange(selectedValue: string) {
    const phoneControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneControl.setValidators([Validators.required, Validators.minLength(10) ]);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();

  }

  

  logValidationErrors(group: FormGroup = this.employeeForm): void{
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if(abstractControl instanceof FormGroup) {
    } else {
      this.formErrors[key] = '';
      if(abstractControl && !abstractControl.valid && 
        (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
       
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + '';
          }
        }
        
      }
      // console.log('key= ' + key + ' Value =' + abstractControl.value);
    }
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
  onSubmit (): void {
    console.log(this.employeeForm.dirty);
    console.log(this.employeeForm.value);

    console.log(this.employeeForm.controls.fullName.touched);
    console.log(this.employeeForm.get('fullName').value);
  }

}

function emailDomain(control: AbstractControl): { [key: string ]: any} | null {
  const email: string = control.value;
  const domain = email.substring(email.lastIndexOf('@') + 1);
  if (domain.toLowerCase () === 'mail.com') {
    return null;
  }else {
    return { 'emailDoamin': true };

  }
}

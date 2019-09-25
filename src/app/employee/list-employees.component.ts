import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      input1: ['', [Validators.required]],
      input2: ['', [Validators.required]],
      input3: ['', [Validators.required]],
      input4: ['', [Validators.required]],
    },
      { validator: this.fieldMatcher('input1', 'input2', 'input3', 'input4') });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

  fieldMatcher(value1: string, value2: string, value3: string, value4: string) {
    return (group: FormGroup) => {

      let input1 = group.controls[value1].value;
      let input2 = group.controls[value2].value;
      let input3 = group.controls[value3].value;
      let input4 = group.controls[value4].value;

      if (input1 && input2 && input3 && input4) {
        if (input1 != input2 || input2 != '') {
          return group.controls[value2].setErrors({ emailMismatch: false });
          
        }else if (input3 != input4 || input4 != '') {
          return group.controls[value4].setErrors({ ssnMismatch: false });
        }
          
      }
     

    }

  }

}

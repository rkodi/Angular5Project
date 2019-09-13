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
      amount1: ['', [Validators.required]],
      amount2: ['', [Validators.required]],
      amount3: ['', [Validators.required]],
    },
      { validator: this.fieldMatcher('amount1', 'amount2', 'amount3') });
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

  fieldMatcher(value1: string, value2: string, value3: string) {
    return (group: FormGroup) => {

      let amount1 = Number(group.controls[value1].value);
      let amount2 = Number(group.controls[value2].value);
      let amount3 = Number(group.controls[value3].value);

      if (amount1 && amount2 && amount3) {
        if (amount1 <= amount2) {
          return group.controls[value2].setErrors({ notEquivalent: true })
        }
        else if (amount1 <= amount3) {
          return group.controls[value3].setErrors({ notEquivalent: true })
        }
      }

    }

  }


  
}

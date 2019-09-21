import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { BaseService } from '../base.service';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  isDoubleNineExist: boolean = false;


  constructor(private formBuilder: FormBuilder, public router: Router, public _baseService: BaseService) { }

  ngOnInit() {

    this._baseService.getAllPrimaryTitles();

    this.registerForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      inputText: [''],
    });


  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));

    localStorage.setItem('addressInfo', JSON.stringify(this.registerForm.value));

    this.router.navigate(['thirdpage']);
  }


  onChangePrimaryTitle(event: any) {


    console.log(event.target.value);
    // I want to do something here for new selectedDevice, but what I
    // got here is always last selection, not the one I just select.

    let primary_id = event.target.value;

    this._baseService.getAllSubTitles(primary_id);

  }


  onChangeSubTitle(event: any) {

    let subTitleID = event.target.value;

    if (subTitleID) {
      var selectedID = subTitleID.toString();
      var isExist = selectedID.includes("99");

      if (isExist) {
        this.isDoubleNineExist = true;

      }
      else {
        this.isDoubleNineExist = false;
      }


    }
    else {
      this.isDoubleNineExist = false;
    }


  }


}

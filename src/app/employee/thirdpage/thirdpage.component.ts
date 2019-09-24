import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


import { BaseService } from '../../base.service';



@Component({
  selector: 'app-thirdpage',
  templateUrl: './thirdpage.component.html',
  styleUrls: ['./thirdpage.component.css']
})
export class ThirdpageComponent implements OnInit {

  storedInfo: any = {};

  registerForm: FormGroup;
  submitted = false;

  isDoubleNineExist: boolean = false;

  constructor(private formBuilder: FormBuilder, public router: Router, public _baseService: BaseService) { }


  ngOnInit() {

    this.storedInfo = localStorage.getItem('addressInfo') ? JSON.parse(localStorage.getItem('addressInfo')) : {};


    this._baseService.getAllPrimaryTitles();

    this.registerForm = this.formBuilder.group({
      title: [this.storedInfo.title, [Validators.required]],
      subtitle: [this.storedInfo.subtitle, [Validators.required]],
      inputText: [this.storedInfo.inputText],
    });


    if (this.storedInfo.inputText) {
      this.isDoubleNineExist = true;
    }

    if (this.storedInfo.title) {
      let primary_id = Number(this.storedInfo.title);
      this._baseService.getAllSubTitles(primary_id);
    }

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

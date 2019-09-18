import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thirdpage',
  templateUrl: './thirdpage.component.html',
  styleUrls: ['./thirdpage.component.css']
})
export class ThirdpageComponent implements OnInit {

  storedInfo:any={};


  constructor() { }

  ngOnInit() {

this.storedInfo=localStorage.getItem('addressInfo')?JSON.parse(localStorage.getItem('addressInfo')):{};


  }

}

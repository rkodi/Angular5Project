import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thirdpage',
  templateUrl: './thirdpage.component.html',
  styleUrls: ['./thirdpage.component.css']
})
export class ThirdpageComponent implements OnInit {

  storedInfo:any={};


  
 AllDesc:any = [
  "7538=Automotive Repair Shops-Non-Dealer",
  "5542=Automated Gasoline Dispensers",
  "5511=Automobile & Truck Dealers-New",
  "5521=Automobile And Truck Dealers-Used",
  "7523=Automobile Parking Lots",
  "5533=Automotive Parts,Accessories Stores",
  "5532=Automotive Tire Stores",
  "7531=Automotive Top And Body Repair",
  "5551=Boat Dealers",
  "4457=Boat Rentals & Leases",
  "7542=Car Washes",
  "7394=Equipment Rental & Leasing Services",
  "5541=Gas/Service Stations",
  "4468=Marinas, Marine Service",
  "5271=Mobile Home Dealers",
  "7519=Motor Home & Recreational Vehicles ",
  "5592=Motor Homes Dealers",
  "5571=Motorcycle Dealers",
  "7535=Paint Shops-Automotive",
  "5561=Recreational & Utility Trailers",
  "5598=Snowmobile Dealers",
  "7534=Tire Retreading & Repair",
  "7549=Towing Services",
  "7513=Truck And Utility Trailer Rentals",
  "5935=Wrecking And Salvage Yards",
  "5599=Misc Automotive, Aircraft, Farm Equip Dealers"
];



 arrObject:any[] = [];


  constructor() { }

  ngOnInit() {

this.storedInfo=localStorage.getItem('addressInfo')?JSON.parse(localStorage.getItem('addressInfo')):{};



let self=this;

this.AllDesc.forEach(function (item) {

  var res = item.split("=");
  debugger;

  let objectVal = {
    "id": Number(res[0]),
    "title": res[1],
    "primary_id":2
  };

  self.arrObject.push(objectVal);

})


console.log(this.arrObject);



  }

}

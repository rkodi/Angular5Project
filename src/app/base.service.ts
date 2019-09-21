import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  AllPrimaryTitles: any[] = [];
  AllSubTitles: any[] = [];

  constructor(private http: HttpClient) {
    this.getAllPrimaryTitles();
  }


  doGET(configUrl: any) {
    return this.http.get(configUrl);
  }


  async getAllPrimaryTitles() {
    let requestURL = "assets/json/primary_titles.json";

    this.doGET(requestURL)
      .subscribe(
        (result: any) => {

          this.AllPrimaryTitles = result;

        },
        (error: any) => {
          //console.log("Rrror", error);

        }
      );
  }

  async getAllSubTitles(primary_id: any) {
    let requestURL = "assets/json/sub_titles.json";

    this.AllSubTitles = [];

    this.doGET(requestURL)
      .subscribe(
        (result: any) => {

          let allSubTitlesList = result;
          let allFilteredSubTitles = allSubTitlesList.filter(x => x.primary_id === Number(primary_id));

          this.AllSubTitles = allFilteredSubTitles;

        },
        (error: any) => {
          //console.log("Rrror", error);

        }
      );
  }




}

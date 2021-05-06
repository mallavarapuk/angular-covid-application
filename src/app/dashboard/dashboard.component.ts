import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http:HttpClient,private route: Router) { 
    
  }

  serverURL = "https://my-covid-application.herokuapp.com";
  // serverURL = "http://localhost:9595";

  title:"Covid DashBoard"
  stateData:any
  districtData:any;
  goBack:boolean=true;

 

  ngOnInit(): void {
    this.getStateCovidRecords();
  }

  goBackToState(){
    this.districtData = null;
    this.goBack= false;
  }

  getStateCovidRecords(){
    this.http.get(this.serverURL+"/covid19/india").subscribe(res => {
      if (res) {
        this.stateData = res;
      }
      else {
        this.stateData = [];
      }
    })
  }

  getDistrictCovidData(stateData){
    this.http.get(this.serverURL+"/covid19/district/"+stateData.state).subscribe(res => {
      if (res) {
        this.districtData = res;
      }
      else {
        this.districtData = [];
      }
    })
  }

  navigateDetails(){
    console.log("Navigating")
this.route.navigateByUrl("https://www.google.com");
  }

}

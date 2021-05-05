import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http:HttpClient) { 
    
  }

  title:"Covid DashBoard"
  stateData:any

  ngOnInit(): void {
    this.getStateCovidRecords();
  }

  getStateCovidRecords(){
    this.http.get("https://my-covid-application.herokuapp.com/covid19/india").subscribe(res => {
      if (res) {

        this.stateData = res;
       
      }
      else {
        this.stateData = [];
      }
    })
  }

}

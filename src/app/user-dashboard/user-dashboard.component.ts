import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule,FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  responseData:any;
  selectedState:any
  stateData:any
  districtData:any;
  goBack:boolean=true;
  searchData:any;
  bloodType:any;


  constructor(private http:HttpClient,private fb:FormBuilder,private route:Router) { }

  serverURL = "https://my-covid-application.herokuapp.com";
  // serverURL = "http://localhost:9595";

  ngOnInit(): void {
    this.getBloodTypes();
  }

  registrationForm = this.fb.group({
    bloodtype: ['',[Validators.required]],
    country: ['',[Validators.required]],
    state: ['',[Validators.required]],
    district: ['',[Validators.required]],

  });

  getDonarsData(){
    console.log(this.registrationForm.value)
    let body = {
      "bloodGroup":this.registrationForm.controls.bloodtype.value,
      "country":this.registrationForm.controls.country.value,
      "state":this.registrationForm.controls.state.value,
      "district":this.registrationForm.controls.district.value,
      "city":"",
      }
      this.http.post<any>(this.serverURL+"/search",body).subscribe((res)=>{
        console.log(res)
        if(res.success){
          this.responseData=res.data;
          console.log(this.responseData)
          // this.route.navigate(['/login']);
        }
        else{
          this.responseData=[]
          // this.message = res.message;
        }
      })
  }

  getstateDetails(){
    this.http.get(this.serverURL+"/states/india/").subscribe(res => {
      if (res) {
        this.stateData = res;
        this.stateData = this.stateData.data
        console.log(this.stateData)
      }
      else {
        this.stateData = [];
      }
    })
  }

  getBloodTypes(){
    this.http.get(this.serverURL+"/blood-types").subscribe(res => {
      if (res) {
        this.bloodType = res;
        this.bloodType = this.bloodType.data
        console.log(this.bloodType)
      }
      else {
        this.bloodType = [];
      }
    })
  }

  getDistrictDetails(key){
    this.http.get(this.serverURL+"/districts/"+key.target.value).subscribe(res => {
      // console.log("Hello   "+key.target.value)
      if (res) {
        this.districtData = res;
        this.districtData = this.districtData.data
        console.log(this.districtData)
      }
      else {
        this.districtData = [];
        console.log("Hello")
      }
    })
  }

}

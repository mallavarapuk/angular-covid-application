import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule,FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message:String;
  isUserExisted:any
  isUserExistedMessage:true
  submitted = false;
  constructor(private http:HttpClient,private fb:FormBuilder,private route:Router) { }
  registrationForm = this.fb.group({
    fullname: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
    username: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(18)]],
    bloodtype: ['',[Validators.required]],
    mobileno: ['',[Validators.required,Validators.minLength(10),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    country: ['',[Validators.required]],
    state: ['',[Validators.required]],
    district: ['',[Validators.required]],
    emailid: ['',[Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    confirmpassword: ['',[Validators.required]]

  }, { 
    validator: this.ConfirmedValidator('password', 'confirmpassword'),
  });


 ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

 

  ngOnInit(): void {
    // this.getstateDetails();
    this.getBloodTypes();
  }

  serverURL = "https://my-covid-application.herokuapp.com";
  // serverURL = "http://localhost:9595";

  title:"Covid DashBoard"
  selectedState:any
  stateData:any
  districtData:any;
  goBack:boolean=true;
  searchData:any;
  bloodType:any;
  
  createUserRegistration(){
    console.log(this.registrationForm.value)
    let body = {
      "fullName":this.registrationForm.controls.fullname.value,
      "bloodGroup":this.registrationForm.controls.bloodtype.value,
      "mobileNumber":this.registrationForm.controls.mobileno.value,
      "country":this.registrationForm.controls.country.value,
      "state":this.registrationForm.controls.state.value,
      "district":this.registrationForm.controls.district.value,
      "city":"",
      "emailId":this.registrationForm.controls.emailid.value,
      "userName":this.registrationForm.controls.username.value,
      "password":this.registrationForm.controls.password.value,
      "reTypePassword":this.registrationForm.controls.confirmpassword.value,
      "availablity":"Yes",
      "isWillingPlasma":"No"
      }
      this.http.post<any>(this.serverURL+"/register",body).subscribe((res)=>{
        console.log(res)
        if(res.success){
          this.route.navigate(['/login']);
        }
        else{
          this.message = res.message;
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

  isUserNameExisted(name:String){
   
    this.http.get<any>(this.serverURL+"/check/username/"+name).subscribe(res => {
      if (!res.success) {
        this.isUserExisted = res.success;
        this.isUserExistedMessage = res.message;
      }
      else{
        this.isUserExisted = res.success;
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
      console.log("Hello   "+key.target.value)
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

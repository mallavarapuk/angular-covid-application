import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string
  response :true
  serverURL = "https://my-covid-application.herokuapp.com";
  // serverURL = "http://localhost:9595";

  constructor(private http: HttpClient, private fb: FormBuilder, private route: Router) { }


  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
  }

  userLogin() {
    let body = {
      "userName": this.loginForm.controls.username.value,
      "password": this.loginForm.controls.password.value,
    }


    this.http.post<any>(this.serverURL + "/login", body).subscribe((res) => {
      console.log(res)
      if (res.success) {
        this.response = res.success;
        // this.route.navigate(['/login']);
      }
      else {
        this.response = res.success;
        this.message = res.message;
      }
    })
  }

}

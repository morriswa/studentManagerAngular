import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '../interface/response';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginRequest } from '../interface/login-request';

@Component({
  selector: 'app-resthttp',
  templateUrl: './resthttp.component.html',
  styleUrls: ['./resthttp.component.css']
})
export class ResthttpComponent {

  readonly HTTP_URL: string = 'http://localhost:8080/';
  message: string = "no data yet";

  public loginForm: FormGroup; 

  constructor(private http: HttpClient, private fb: FormBuilder) 
  {
    this.loginForm = this.fb.group({
      username: "",
      password: ""
    });
   }

  sayHi() {
    this.http.get<Response>(this.HTTP_URL + 'hello').subscribe(response => {
      this.message = response.message;
    });
  }


  sayHiWithCreds() {
    let loginRequest: LoginRequest = {
      "username" : this.loginForm.get('username')?.value,
      "password" : this.loginForm.get('password')?.value
    };
  
    try {
      this.http.post<Response>(this.HTTP_URL + 'api/hello',loginRequest).subscribe(response => {
        this.message = response.message;
      });
    } catch(e) {
      this.custErrorHandler(e);
    }
    
    // this.http.get<Response>(this.HTTP_URL + 'api/hello').subscribe(response => {
    //   this.message = response.message;
    // })
  }

  
  registerUser() {
    let loginRequest: LoginRequest = {
      "username" : this.loginForm.get('username')?.value,
      "password" : this.loginForm.get('password')?.value
    };

    try {
      this.http.post<Response>(this.HTTP_URL + 'user/signup',loginRequest).subscribe(response => {
        this.message = response.message;
      });
    } catch(e) {
      this.custErrorHandler(e);
    }  
  }

  custErrorHandler(e: any) {
    this.message = e.message;
    console.log(e);
  }
}

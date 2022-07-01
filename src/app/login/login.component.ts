import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { LoginRequest } from '../interface/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public message: string; 
  public loginForm: FormGroup;
  
  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.message = "--nothing to display--";
    this.loginForm = this.fb.group({
      "username" : "",
      "password" : "",
      "new_password" : ""
    })
  }

  sayHi(): void {
    let login = this.buildLoginCreds();
    let response = this.httpService.sayHi(login);
    response.subscribe(response => {
      this.message = response.message;
    })
  }

  registerUser(): void {
    let response = this.httpService.registerUser(this.buildLoginCreds());
    response.subscribe(response => {
      this.message = response.message;
    })
  }

  changePassword(): void {
    let response = this.httpService.changePassword(this.buildLoginCreds(),this.loginForm.get('new_password')?.value);
    response.subscribe(response => {
      this.message = response.message;
    })
  }

  buildLoginCreds(): LoginRequest {
    return {
      "username" : this.loginForm.get('username')?.value,
      "password" : this.loginForm.get('password')?.value
    }
  }
}

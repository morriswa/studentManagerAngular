import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../http.service';
import { LoginRequest } from '../interface/login-request';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // PUBLIC
  public message: string; 


  // PRIVATE
  public loginForm: FormGroup;


  // INIT
  constructor(private httpService: HttpService, private loginService:LoginService, private fb: FormBuilder) {
    this.message = "";

    this.loginForm = this.fb.group({
      "username" : "",
      "password" : ""
      // "new_password" : "",
      // "nickname" : "",
    });
  }

  ngOnInit(): void { }


  // GETTER SETTER
  public isLoggedIn(): boolean {
    return this.loginService.getStatus();
  }


  // ONCLICK
  public async sayHi(): Promise<void> {
    await this.loginService.saveLogin(this.getLoginRequestFromForm())
    .catch(err => {
      console.warn(err);
      this.message = err.message;
    })

    await this.httpService.sayHi(this.loginService.getLogin())
    .then(promise => {
      this.loginForm.setValue({
        "username" : this.loginService.getLogin().username,
        "password" : ""
      });
      this.message = promise.message;
    }).catch(err => {
      console.warn(err);
      this.loginForm.setValue({
        "username" : this.loginService.getLogin().username,
        "password" : ""
      });
      this.message = err.message;
    });
  }

  public logout(): void {
    this.loginForm.reset();
    this.message = this.loginService.logout();
  }

  public async registerUser(): Promise<void> {
    await this.httpService.registerUser(this.getLoginRequestFromForm())
    .then(promise => {
      this.sayHi();
      this.loginForm.setValue({
        "username" : this.loginService.getLogin().username,
        "password" : ""
      });
      this.message = promise.message;
    }).catch(err => {
      console.warn(err);
      this.loginForm.reset();
      this.message = err.message;
    });
  }


  // HELPER
  private getLoginRequestFromForm(): LoginRequest {
    return {
      "username" : this.loginForm.get('username')?.value,
      "password" : this.loginForm.get('password')?.value
    }
  }

}

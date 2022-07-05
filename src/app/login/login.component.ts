import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { LoginRequest } from '../interface/login-request';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private getLoginRequestFromForm(): LoginRequest {
    return {
      "username" : this.loginForm.get('username')?.value,
      "password" : this.loginForm.get('password')?.value
    }
  }

  public message: string; 
  public loginForm: FormGroup;

  constructor(private httpService: HttpService, private loginService:LoginService, private fb: FormBuilder) {
    this.message = "";

    this.loginForm = this.fb.group({
      "username" : "",
      "password" : "",
      "new_password" : "",
      "nickname" : "",
    });

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public async sayHi() {
    await this.loginService.saveLogin(this.getLoginRequestFromForm())
    .catch(err => {
      console.warn(err);
      this.message = err.message;
    })

    await this.httpService.sayHi(this.loginService.getLogin())
    .then(promise => {
      this.message = promise.message;
    }).catch(err => {
      console.warn(err);
      this.message = err.message;
    });
  }

  public logout(): void {
    // this.resetListOfStudents();
    this.message = this.loginService.logout();
  }

  public isLoggedIn(): boolean {
    return this.loginService.getStatus();
  }

  public async registerUser() {
    await this.httpService.registerUser(this.getLoginRequestFromForm())
    .then(promise => {
      this.message = promise.message;
    }).catch(err => {
      console.warn(err);
      this.message = err.message;
    });
  }

  public async changePassword() {
    await this.httpService.changePassword(
          this.loginService.getLogin(),
          this.loginForm.get('new_password')?.value)
    .then(promise => {
      this.message = promise.message;
    }).catch(err => {
      console.warn(err);
      this.message = err.message;
    })
  }

  
}

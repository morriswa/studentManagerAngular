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

  private buildLoginCreds(): LoginRequest {
    return {
      "username" : this.loginForm.get('username')?.value,
      "password" : this.loginForm.get('password')?.value
    }
  }

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

  public async sayHi() {
    let login = this.buildLoginCreds();
    this.httpService.saveLogin(login);

    this.message = (await this.httpService.sayHi(login)).message;
  }

  public async registerUser() {
    this.message = (await this.httpService.registerUser(this.buildLoginCreds())).message;
  }

  public async changePassword() {
    this.message = (await this.httpService
                              .changePassword(
                                this.buildLoginCreds(),
                                this.loginForm.get('new_password')?.value)).message;
  }
}

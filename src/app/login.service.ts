import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LoginRequest } from './interface/login-request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginStatus:boolean;
  private login:LoginRequest;
  constructor(private httpService:HttpService) {
    this.loginStatus = false;
    this.login = {
      "username" : "",
      "password" : ""
    }
  }

  public getLogin(): LoginRequest {
    return this.login;
  }

  public async saveLogin(request:LoginRequest) {
    await this.httpService.sayHi(request)
    .then(promise => {
      this.login = request;
      this.loginStatus = true;
    }).catch(err => {
      throw new Error("Login FAILED");
    })
  }

  public getStatus(): boolean {
    return this.loginStatus;
  }
  public logout(): string {
    this.loginStatus = false;
    let old: string = this.login.username;
    this.login = {
      "username" : "",
      "password" : ""
    } 
    return old + " successfully logged out! Goodbye"
  }
}
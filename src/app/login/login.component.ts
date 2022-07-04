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
export class LoginComponent implements OnInit {

  private buildLoginCreds(): LoginRequest {
    return {
      "username" : this.loginForm.get('username')?.value,
      "password" : this.loginForm.get('password')?.value
    }
  }

  
  
  public logout(): void {

  }

  public message: string; 
  public loginForm: FormGroup;
  public listOfStudents: Array<string>; 

  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.message = "";

    this.loginForm = this.fb.group({
      "username" : "",
      "password" : "",
      "new_password" : "",
      "nickname" : "",
    });

    this.listOfStudents = Array("Please log in");
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



  public async sayHi() {
    let login = this.buildLoginCreds();
    this.httpService.saveLogin(login);
    this.refreshListOfStudents();

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

  public async addStudent() {
    this.message = (await this.httpService.addNewStudent(this.buildLoginCreds(), this.loginForm.get('nickname')?.value)).message;
    this.refreshListOfStudents();
  }

  public async delStudent() {
    this.message = (await this.httpService.delStudent(this.buildLoginCreds(), this.loginForm.get('nickname')?.value)).message;
    this.refreshListOfStudents();
  }

  public async refreshListOfStudents() {
    this.listOfStudents = await this.httpService.getAllStudents(this.buildLoginCreds())
  }

}

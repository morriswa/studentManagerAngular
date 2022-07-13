import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '../http.service';
import { LoginRequest } from '../interface/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // PUBLIC
  public message: string; 


  // INIT
  constructor(private hs: HttpService, 
              private fb: FormBuilder,
              private auth0: AuthService) {
    this.message = "";
  }

  ngOnInit(): void { }


  // METHODS
  public logIn() {
    this.auth0.loginWithRedirect();
    this.message = "Welcome :)";
  }

  public logout(): void {
    this.auth0.logout();
    this.message = "BYE";
  }
}

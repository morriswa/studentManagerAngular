import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // PUBLIC
  public message: string; 


  // PRIVATE
  private loginStatus: boolean;


  // INIT
  constructor(private hs: HttpService, 
              private fb: FormBuilder,
              private auth0: AuthService) {
    this.message = "";
    this.loginStatus = false;
  }

  ngOnInit(): void {
    this.loginChecker();
  }


  // SERVICE 
  private async loginChecker() {
    this.auth0.isAuthenticated$.subscribe(bool => {
      this.loginStatus = bool;
    });
  }


  // GETTER 
  public isLoggedIn(): boolean {
    return this.loginStatus;
  }
  

  // ONCLICK
  public logIn() {
    this.auth0.loginWithRedirect();
    this.message = "Welcome :)";
  }

  public logout(): void {
    this.auth0.logout();
    this.message = "BYE";
  }
}

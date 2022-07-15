import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService, User } from '@auth0/auth0-angular';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // PUBLIC
  public message: string; 
  public auth0user: User;



  // PRIVATE
  private loginStatus: boolean;


  // INIT
  constructor(private hs: HttpService, 
              private fb: FormBuilder,
              private auth0: AuthService) {
    this.message = "";
    this.loginStatus = false;
    this.auth0user = new User();
    this.fetchUserProfile();
  }

  ngOnInit(): void {
    this.loginChecker();
    this.fetchUserProfile();

  }


  // SERVICE 
  private async loginChecker() {
    this.auth0.isAuthenticated$.subscribe(bool => {
      this.loginStatus = bool;
    });
  }

  public async fetchUserProfile() {
    this.auth0.user$.subscribe(user => {
      this.auth0user = user!;
    })
  }


  // GETTER 
  public isLoggedIn(): boolean {
    return this.loginStatus;
  }
 
  public getAuthenticatedUserName(): string {
    return this.auth0user.name!;
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

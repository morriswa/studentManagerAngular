import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { firstValueFrom, lastValueFrom, observable } from 'rxjs';
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


  // DEBUGGING 
  public loginAndRegisterFlow() {
    if (this.isLoggedIn()) {
      this.hs.v2login().subscribe({
        next: (obs) => console.log(obs),
        error: (err) => console.error(err)
      });
    }
  }


  // SERVICE 
  private loginChecker() {
    this.auth0.isAuthenticated$.subscribe(bool => {
      this.loginStatus = bool;
    });
  }

  private fetchUserProfile() {
    this.auth0.user$.subscribe({
      next : (user) => {
        this.auth0user = user!;
        this.loginAndRegisterFlow();
      }, error: (err) => {
        console.error(err);
      }
    });
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

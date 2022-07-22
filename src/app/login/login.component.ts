import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

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
  private EMAIL: string;


  // INIT
  constructor(private http: HttpClient, 
              private auth0: AuthService) {
    this.message = "";
    this.loginStatus = false;
    this.auth0user = new User();
    this.EMAIL = "";
  }

  ngOnInit(): void {
    this.loginChecker();
    this.fetchUserProfile();
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
        this.EMAIL = this.auth0user.email!;
        this.loginAndRegisterFlow();
      }, error: (err) => {
        console.error(err);
      }
    });
  }

  private loginAndRegisterFlow() {
    if (this.isLoggedIn()) {
      this.http.post(environment.api+'login',{},
      {
        "headers" : {
          "email" : this.EMAIL
        }, "responseType" : "text"
      }).subscribe({
        next: (obs) => console.log(obs),
        error: (err) => console.error(err)
      });
    }
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

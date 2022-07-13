import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-app';
  private loginStatus: boolean = false;

  constructor(private auth0: AuthService){
    this.loginChecker();
  }

  public isLoggedIn(): boolean {
    return this.loginStatus;
  }

  private async loginChecker() {
    this.auth0.isAuthenticated$.subscribe(bool => {
      this.loginStatus = bool;
    })
  }
}


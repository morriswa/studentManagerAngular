import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // PUBLIC DAO
  public auth0user: User;


  // INIT
  constructor(private auth0: AuthService) {
    this.auth0user = new User();
    this.fetchUserProfile();
  }

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  
  // SERVICE
  public async fetchUserProfile() {
    this.auth0.user$.subscribe(user => {
      this.auth0user = user!;
    })
  }
}

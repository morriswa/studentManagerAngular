import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../http.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {


  profileForm: FormGroup;
  public message: string;

  constructor(private hs: HttpService, private ls: LoginService, private fb: FormBuilder) { 
    this.message = "";
    this.profileForm = this.fb.group({
      "username" : "",
      "password" : "",
      "new_password" : "",
      "new_username" : ""
    })
  }

  ngOnInit(): void {
  }

  public async changePassword() {
    await this.hs.changePassword(
          this.ls.getLogin(),
          this.profileForm.get('new_password')?.value)
    .then(promise => {
      this.message = promise.message;
    }).catch(err => {
      console.warn(err);
      this.message = err.message;
    })
  }

}

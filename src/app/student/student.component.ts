import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../http.service';
import { LoginRequest } from '../interface/login-request';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  private buildLoginCreds(): LoginRequest {
    return this.httpService.getLogin();
  }
  
  public studentForm: FormGroup;
  public message: string;

  constructor(private httpService: HttpService, private fb: FormBuilder) { 
    this.studentForm = this.fb.group({
      "nickname" : "",
    });

    this.message = "--nothing to display--";
  }

  ngOnInit(): void {
  }

  public async getAllStudents() {
    this.message = (await this.httpService.getAllStudents(this.buildLoginCreds())).message;
  }

}

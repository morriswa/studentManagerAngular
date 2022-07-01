import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '../interface/response';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resthttp',
  templateUrl: './resthttp.component.html',
  styleUrls: ['./resthttp.component.css']
})
export class ResthttpComponent {

  readonly HTTP_URL: string = 'http://localhost:8080/';
  message: string = "no data yet";

  loginForm: FormGroup;
  studentForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder ) 
  {
    this.loginForm = this.fb.group({
      "username" : "",
      "password" : "",
      "new_password" : ""
    })

    this.studentForm = this.fb.group({
      "nickname" : "",
      "year" : "",
      "term" : "",
      "title" : ""
    })
  }

  // GET hello
  sayHi() {
    this.http.get<Response>(this.HTTP_URL + 'hello').subscribe(response => {
      this.message = response.message;
    });
  }

  // POST api/hello
  sayHiWithCreds() { 
    let request = {
      "login" : {
        "username" : this.loginForm.get('username')?.value,
        "password" : this.loginForm.get('password')?.value
      },
      "object" : {
        "message" : "no data to transmit"
      }
    }

    try {
      this.http.post<Response>(this.HTTP_URL + 'api/hello',request).subscribe(response => {
        this.message = response.message;
      });
    } catch(e) {
      this.custErrorHandler(e);
    }
    
    // this.http.get<Response>(this.HTTP_URL + 'api/hello').subscribe(response => {
    //   this.message = response.message;
    // })
  }

  // POST user/signup
  registerUser() {
    let request = {
      "login" : {
        "username" : this.loginForm.get('username')?.value,
        "password" : this.loginForm.get('password')?.value
      }
    }

    try {
      this.http.post<Response>(this.HTTP_URL + 'user/signup',request).subscribe(response => {
        this.message = response.message;
      });
    } catch(e) {
      this.custErrorHandler(e);
    }  
  }
  
  changePassword() {
    let request = {
      "login" : {
        "username" : this.loginForm.get('username')?.value,
        "password" : this.loginForm.get('password')?.value
      },
      "new_password" : this.loginForm.get('new_password')?.value 
    }

    try {
      this.http.put<Response>(this.HTTP_URL + 'user/changepassword',request).subscribe(response => {
        this.message = response.message;
      });
    } catch(e) {
      this.custErrorHandler(e);
    }  
    
  }

  addNewStudent() {
    let request = {
      "login" : {
        "username" : this.loginForm.get('username')?.value,
        "password" : this.loginForm.get('password')?.value
      },
      "new_student_nickname" : this.studentForm.get('nickname')?.value 
    }

    try {
      this.http.post<Response>(this.HTTP_URL + 'api/student/add',request).subscribe(response => {
        this.message = response.message;
      });
    } catch(e) {
      this.custErrorHandler(e);
    }   
  }

  custErrorHandler(e: any) {
    this.message = e.message;
    console.log(e);
  }

  getStudentInfo() {
    let request = {
      "login" : {
        "username" : this.loginForm.get('username')?.value,
        "password" : this.loginForm.get('password')?.value
      },
      "nickname" : this.studentForm.get('nickname')?.value 
    } 
  }

  // updateStudentInfo() {
  //   let request = {
  //     "login" : {
  //       "username" : this.loginForm.get('username')?.value,
  //       "password" : this.loginForm.get('password')?.value
  //     },
  //     "nickname" : this.studentForm.get('nickname')?.value,
  //     "name_first" : this.studentForm.get('name_first')?.value,
  //     "name_last" : this.studentForm.get('name_last')?.value,
  //     "name_middle" : this.studentForm.get('name_middle')?.value,
  //     "school_attending" : this.studentForm.get('school_attending')?.value,
  //   }

  //   try {
  //     this.http.put<Response>(this.HTTP_URL + 'api/student/updateinfos',request).subscribe(response => {
  //       this.message = response.message;
  //     });
  //   } catch(e) {
  //     this.custErrorHandler(e);
  //   }  

  // }
}

// TODO angular material
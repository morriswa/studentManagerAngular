import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { LoginRequest } from './interface/login-request';
import { Response } from './interface/response';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private custErrorHandler(e: any): string {
    console.log(e);
    return e.message;
  }

  readonly HTTP_URL: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  // POST api/hello >> Response{ string }
  public sayHi(login: LoginRequest): Observable<Response> { 
    try {
      let request = {
        "login" : login,
        "data": {
          "message" : "nothing to report"
        }
      }
      return this.http.post<Response>(this.HTTP_URL + 'api/hello',request);
    } catch (e: any) {
      let errorReport: string = this.custErrorHandler(e);
      return of({"message" : errorReport});
    }
  }

  // POST user/signup
  registerUser(newUserRequest: LoginRequest): Observable<Response> {
    try {
      let request = {
        "login" : newUserRequest
      }
      return this.http.post<Response>(this.HTTP_URL + 'user/signup',request);
    } catch(e) {
      let errorReport: string = this.custErrorHandler(e);
      return of({"message" : errorReport});
    }  
  }
  
  changePassword(login: LoginRequest, new_password: string): Observable<Response> {
    try {
      let request = {
        "login" : login,
        "new_password" : new_password
      }
      return this.http.put<Response>(this.HTTP_URL + 'user/changepassword',request);
    } catch(e) {
      let errorReport: string = this.custErrorHandler(e);
      return of({"message" : errorReport});
    }  
  }

  addNewStudent(login: LoginRequest, nickname: string): Observable<Response> {
    try {
      let request = {
        "login" : login,
        "new_student_nickname" : nickname
      }
      return this.http.post<Response>(this.HTTP_URL + 'api/student/add',request);
    } catch(e) {
      let err: string = this.custErrorHandler(e);
      return of({"message" : err});
    }   
  }

  updateStudentInfo(login: LoginRequest, 
                    nickname: string, 
                    name_first: string, 
                    name_last: string, 
                    name_middle: string, 
                    school_attending: string): Observable<Response>
  {
    try {
      let request = {
        "login" : login,
        "nickname" : nickname,
        "name_first" : name_first,
        "name_last" : name_last,
        "name_middle" : name_middle,
        "school_attending" : school_attending,
      }
  
      return this.http.put<Response>(this.HTTP_URL + 'api/student/updateinfos',request);
    } catch(e) {
      let err: string = this.custErrorHandler(e);
      return of({"message" : err});
    }  

  }
  // getStudentInfo() {
  // }
}

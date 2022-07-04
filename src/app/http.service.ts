import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of,lastValueFrom } from 'rxjs';
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

  private login: LoginRequest = {
    "username" : "",
    "password" : ""
  }

  public saveLogin(login: LoginRequest) {
    this.login = login;
  }

  public getLogin(): LoginRequest {
    return this.login;
  }

  readonly HTTP_URL: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  // POST api/hello >> Response{ string }
  public async sayHi(login: LoginRequest) { 
    try {
      let request = {
        "login" : login,
        "data": {
          "message" : "nothing to report"
        }
      }
      let response: Response = await lastValueFrom(this.http.post<Response>(this.HTTP_URL + 'api/hello',request));
      return response;
    } catch (e: any) {
      let errorReport: string = this.custErrorHandler(e);
      return Promise.reject({"message" : errorReport});
    }
  }

  // POST user/signup
  public async registerUser(newUserRequest: LoginRequest) {
    try {
      let request = {
        "login" : newUserRequest
      }
      let response: Response = await lastValueFrom(this.http.post<Response>(this.HTTP_URL + 'user/signup',request));
      return response;
    } catch(e) {
      let errorReport: string = this.custErrorHandler(e);
      return Promise.reject({"message" : errorReport});
    } 
  }
  
  public async changePassword(login: LoginRequest, new_password: string) {
    try {
      let request = {
        "login" : login,
        "new_password" : new_password
      }
      let response: Response = await lastValueFrom(this.http.put<Response>(this.HTTP_URL + 'user/changepassword',request));
      return response;
    } catch(e) {
      let errorReport: string = this.custErrorHandler(e);
      return Promise.reject({"message" : errorReport});
    }  
  }

  public async addNewStudent(login: LoginRequest, nickname: string) {
    try {
      let request = {
        "login" : login,
        "new_student_nickname" : nickname
      }
      return await lastValueFrom(this.http.post<Response>(this.HTTP_URL + 'api/student/add',request));
    } catch(e) {
      let err: string = this.custErrorHandler(e);
      return Promise.reject({"message" : err});
    }   
  }

  public async delStudent(login: LoginRequest, nickname: string) {
    try {
      let request = {
        "login" : login,
        "new_student_nickname" : nickname
      }
      return await lastValueFrom(this.http.put<Response>(this.HTTP_URL + 'api/student/del',request));
    } catch(e) {
      let err: string = this.custErrorHandler(e);
      return Promise.reject({"message" : err});
    }   
  }

  public async updateStudentInfo( login: LoginRequest, 
                                  nickname: string, 
                                  name_first: string, 
                                  name_last: string, 
                                  name_middle: string, 
                                  school_attending: string)
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
      let response: Response = await lastValueFrom(this.http.put<Response>(this.HTTP_URL + 'api/student/updateinfos',request));
      return response;
    } catch(e) {
      let err: string = this.custErrorHandler(e);
      return Promise.reject({"message" : err});
    }  
  }

  public async getAllStudents(login: LoginRequest) {
    try {
      let request = {
        "login" : login,
        "data" : {
          "message" : "nothing to report :("
        }
      }
      let response: Response = await lastValueFrom(this.http.post<Response>(this.HTTP_URL + 'api/student/getall',request));
      return response.message.split("|")
    } catch (e) {
      let err: string = this.custErrorHandler(e);
      return Promise.reject({"message" : err});
    }
  }

  // getStudentInfo() {
  // }
}

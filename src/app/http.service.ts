import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of,lastValueFrom } from 'rxjs';
import { LoginRequest } from './interface/login-request';
import { Response,ResponseType,ErrorResponse } from './interface/response';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
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
    
    let request = {
      "login" : login,
      "data": {
        "message" : "nothing to report"
      }
    }
    let response: any = await lastValueFrom(this.http.post(this.HTTP_URL + 'api/hello',request));
    if (response.exception != null) {
      throw new Error(response.message);
    }
    return response;
   
  }

  // POST user/signup
  public async registerUser(newUserRequest: LoginRequest) {
    let request = {
      "login" : newUserRequest
    }
    let response: any = await lastValueFrom(this.http.post<Response>(this.HTTP_URL + 'user/signup',request));
    if (response.exception != null) {
      throw new Error(response.message);
    }
    return response;
  }
  
  public async changePassword(login: LoginRequest, new_password: string) {
    let request = {
      "login" : login,
      "new_password" : new_password
    }
    let response: any = await lastValueFrom(this.http.put<Response>(this.HTTP_URL + 'user/changepassword',request));
    if (response.exception != null) {
      throw new Error(response.message);
    }
    return response; 
  }

  public async addNewStudent(login: LoginRequest, nickname: string) {
    let request = {
      "login" : login,
      "new_student_nickname" : nickname
    }
    let response: any = await lastValueFrom(this.http.post<Response>(this.HTTP_URL + 'api/student/add',request));
    if (response.exception != null) {
      throw new Error(response.message);
    }
    return response;
  }

  public async delStudent(login: LoginRequest, nickname: string) {
    let request = {
      "login" : login,
      "new_student_nickname" : nickname
    }
    let response: any = await lastValueFrom(this.http.put<Response>(this.HTTP_URL + 'api/student/del',request));
    if (response.exception != null) {
      throw new Error(response.message);
    } 
    return response;
  }

  public async updateStudentInfo( login: LoginRequest, 
                                  nickname: string, 
                                  name_first: string, 
                                  name_last: string, 
                                  name_middle: string, 
                                  school_attending: string)
  {
    
    let request = {
      "login" : login,
      "nickname" : nickname,
      "name_first" : name_first,
      "name_last" : name_last,
      "name_middle" : name_middle,
      "school_attending" : school_attending,
    }
    let response: any = await lastValueFrom(this.http.put<Response>(this.HTTP_URL + 'api/student/updateinfos',request));
    if (response.exception != null) {
      throw new Error(response.message);
    }
    return response;
  }

  public async getAllStudents(login: LoginRequest) {
    let request = {
      "login" : login,
      "data" : {
        "message" : "nothing to report :("
      }
    }
    let response: any = await lastValueFrom(this.http.post<Response>(this.HTTP_URL + 'api/student/getall',request));
    if (response.exception != null) {
      throw new Error(response.message);
    }
    return response.message.split("|")
  }

  // getStudentInfo() {
  // }
}

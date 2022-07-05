import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of,lastValueFrom } from 'rxjs';
import { LoginRequest } from './interface/login-request';
import { Response,ResponseType,ErrorResponse, CourseResponse } from './interface/response';

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
      "nickname" : nickname
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
      "nickname" : nickname
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
    let returnList: Array<string> = response.message.split("|");
    if (returnList.length <= 1) {
      return Array("No students found");
    }
    return returnList.slice(0,-1);
  }

  public async getAllCourses(login: LoginRequest, nickname: string) {
    let request = {
      "login": login,
      "nickname": nickname
    }

    let response: any = await lastValueFrom(this.http.post<CourseResponse>(this.HTTP_URL + 'api/course/all',request));
    if (response.exception != null) {
      throw new Error(response.message);
    } 
    let courseResponse: CourseResponse = response;
    return courseResponse;
  }
 
  public async addCourse( login: LoginRequest, nickname: string, year: number, term: string, 
                          title: string, creditHrs: number, gradepoint: number)
  {
    let request = {
      "login": login,
      "nickname": nickname,
      "year" : year,
      "term" : term,
      "title" : title,
      "creditHrs" : creditHrs,
      "gradepoint" : gradepoint
    } 
    let response: any = await lastValueFrom(this.http.post<Response>(this.HTTP_URL + 'api/course/add',request));
    if (response.exception != null) {
      throw new Error(response.message);
    } 
    let addCourseResponse: Response = response;
    return addCourseResponse;
  }

  public async delCourse(login: LoginRequest, nickname: string, id: number) {
    let request = {
      "login": login,
      "nickname": nickname,
      "id" : id
    } 
    let response: any = await lastValueFrom(this.http.put<Response>(this.HTTP_URL + 'api/course/del',request));
    if (response.exception != null) {
      throw new Error(response.message);
    } 
    let addCourseResponse: Response = response;
    return addCourseResponse;
  }
}

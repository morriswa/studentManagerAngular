import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, observable } from 'rxjs';
import { Course } from './interface/course';
import { Student } from './interface/student';

import { environment as env } from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class HttpService {  
  // CONST
  readonly HTTP_URL: string = env.api;
  private EMAIL: string = "";

  // INIT
  constructor(private http: HttpClient,private auth0: AuthService) {
    this.auth0.user$.subscribe({
      next : (obs) => this.EMAIL = obs?.email!,
      error : (err) => console.error(err)
    })
  }

  // // GET api/v2/hello
  // public v2hello(email: string) {
  //   return this.http.get(this.HTTP_URL + 'api/v2/hello',
  //   {
  //     "headers" : {
  //       "email" : email
  //     }, "responseType" : "text"
  //   });
  // }

  // POST api/v2/login
  public v2login() {
    return this.http.post(this.HTTP_URL + 'api/v2/login',{},
    {
      "headers" : {
        "email" : this.EMAIL
      }, "responseType" : "text"
    });
  }

  // GET api/v2/student/all
  public v2studentGetAll() {
    return this.http.get<Map<string, Student>>(this.HTTP_URL + 'api/v2/student/all',
    {
      "headers" : {
        "email" : this.EMAIL
      }, "responseType" : "json"
    });
  }

  // GET api/v2/student/load
  public v2studentLoad(nick: string) {
    return this.http.get<Array<Course>>(this.HTTP_URL + 'api/v2/student/load',
    {
      "headers" : {
        "email" : this.EMAIL,
        "nick" : nick
      }, "responseType" : "json"
    });
  }

  // DELETE api/v2/student/del
  public v2studentDel(delStudent: string) {
    return this.http.delete<Map<string, Student>>(this.HTTP_URL + 'api/v2/student/del',
    {
      "headers" : {
        "email" : this.EMAIL,
        "nick" : delStudent
      }, "responseType" : "json"
    });
  }

  // POST api/v2/student/add
  public v2studentAdd(newStudent: string) {
    return this.http.post<Map<string, Student>>(this.HTTP_URL + 'api/v2/student/add',{},
    {
      "headers" : {
        "email" : this.EMAIL,
        "nick" : newStudent
      }, "responseType" : "json"
    }); 
  }
  
  // POST api/v2/course/add
  public v2courseAdd(
    nickname: string, year: number, term: string, 
    title: string, creditHrs: number, gradepoint: number) 
  {
    let request = {
      "nickname": nickname,
      "year" : year,
      "term" : term,
      "title" : title,
      "creditHrs" : creditHrs,
      "gradepoint" : gradepoint
    } 
    return this.http.post<Array<Course>>(this.HTTP_URL + 'api/v2/course/add',request,
    {
      "headers" : {
        "email" : this.EMAIL
      }, "responseType" : "json"
    });
  }

  // PATCH api/v2/course/del
  public v2courseDel(nickname: string, id: number) {
    let request = {
      "nickname": nickname,
      "id" : id
    } 
    return this.http.patch<Array<Course>>(this.HTTP_URL + 'api/v2/course/del',request,
    {
      "headers" : {
        "email" : this.EMAIL
      }, "responseType" : "json"
    });
  }

  // PUT api/v2/student/info
  public v2updsteStudentInfo( 
    nickname: string, pronouns: string, name_first: string, 
    name_middle: string, name_last: string, school_attending: string) 
  {
    return this.http.put<Student>(this.HTTP_URL + 'api/v2/student/info',
    {
      "nickname" : nickname,
      "pronouns" : pronouns,
      "name_first" : name_first,
      "name_middle" : name_middle,
      "name_last" : name_last,
      "school_attending" : school_attending
    },{
      "headers" : {
        "email" : this.EMAIL
      }, "responseType" : "json" 
    });
  }

}
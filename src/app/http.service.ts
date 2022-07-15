import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Course } from './interface/course';
import { Student } from './interface/student';

import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {  
  // CONST
  readonly HTTP_URL: string = env.api;


  // INIT
  constructor(private http: HttpClient) { }


  // POST api/v2/login
  public async v2login(): Promise<string> {
    let response: string = "";
    await lastValueFrom(this.http.post<string>(this.HTTP_URL + 'api/v2/login',{}))
    .then(promisedResponse => {
      response = promisedResponse;
    }).catch(err => {
      console.error(err);
      throw new Error(err.error.message)
    })
    return response;
  }

  // GET api/v2/student/all
  public async v2studentGetAll(): Promise<Map<string, Student>> {
    let responseMap:Map<string, Student> = new Map(); 
    await lastValueFrom(this.http.get<Map<string, Student>>(this.HTTP_URL + 'api/v2/student/all'))
    .then(response => {
      responseMap = Object.assign(responseMap,response);
    }).catch(err => {
      console.error(err);
      throw new Error(err.error.message)
    });
    return responseMap
  }

  // GET api/v2/student/load
  public async v2studentLoad(nick: string): Promise<Array<Course>> {
    let response: Course[] = new Array();
    await lastValueFrom(this.http.get<Array<Course>>(this.HTTP_URL + 'api/v2/student/load',{
      "params" : {
        "nick" : nick
      }
    }))
    .then(promise => {
      response = promise;
    }).catch(err => {
      console.error(err);
      throw new Error(err.error.message)
    });
    return response; 
  }

  // DELETE api/v2/student/del
  public async v2studentDel(delStudent: string): Promise<Map<string, Student>> {
    let response: Map<string, Student> = new Map();
    await lastValueFrom(this.http.delete<Map<string, Student>>(this.HTTP_URL + 'api/v2/student/del',{
      "params" : {
        "nick" : delStudent
      }
    })).then(promise => {
      response = Object.assign(response,promise);
    }).catch(err => {
      console.error(err);
      throw new Error(err.error.message);
    });
    return response;
  }

  // POST api/v2/student/add
  public async v2studentAdd(newStudent: string): Promise<Map<string, Student>> {
    let response: Map<string, Student> = new Map();
    await lastValueFrom(this.http.post<Map<string, Student>>(this.HTTP_URL + 'api/v2/student/add',{},{
      "params" : {
        "nick" : newStudent
      }
    })).then(promise => {
      response = Object.assign(response,promise); 
    }).catch(err => {
      console.error(err);
      throw new Error(err.error.message);
    })
    return response; 
  }
  
  // POST api/v2/course/add
  public async v2courseAdd(nickname: string, year: number, term: string, 
              title: string, creditHrs: number, gradepoint: number): Promise<Array<Course>> {
    let request = {
      "nickname": nickname,
      "year" : year,
      "term" : term,
      "title" : title,
      "creditHrs" : creditHrs,
      "gradepoint" : gradepoint
    } 
    let response: Course[] = new Array();
    await lastValueFrom(this.http.post<Array<Course>>(this.HTTP_URL + 'api/v2/course/add',request))
    .then(promise => {
      response = promise;
    }).catch(err => {
      console.error(err);
      throw new Error(err.error.message)
    })
    return response;
  }

  // PATCH api/v2/course/del
  public async v2courseDel(nickname: string, id: number): Promise<Array<Course>> {
    let request = {
      "nickname": nickname,
      "id" : id
    } 
    let response: Course[] = new Array();
    await lastValueFrom(this.http.patch<Array<Course>>(this.HTTP_URL + 'api/v2/course/del',request)).then(promise => {
      response = promise;
    }).catch(err => {
      console.error(err);
      throw new Error(err.error.message)
    })
    return response;
  }

  // PUT api/v2/student/info
  public async v2updsteStudentInfo( nickname: string, name_first: string, name_middle: string, 
                                    name_last: string, school_attending: string): Promise<Map<string, Student>> {
    let students: Map<string,Student> = new Map();
    await lastValueFrom(this.http.put<Student>(this.HTTP_URL + 'api/v2/student/info',{
      "nickname" : nickname,
      "name_first" : name_first,
      "name_middle" : name_middle,
      "name_last" : name_last,
      "school_attending" : school_attending
    })).then(promise => {
      students = Object.assign(students,promise); 
    }).catch(err => {
      console.error(err);
      throw new Error(err.error.message)
    })
    return students;
  }

  // DEV 
  /*
   // // PUT api/student/updateinfo
  // public async updateStudentInfo( 
  //                                 nickname: string,
  //                                 // new_nickname: string,
  //                                 name_first: string, 
  //                                 name_last: string, 
  //                                 name_middle: string, 
  //                                 school_attending: string)
  // {
    
  //   let request = {
  //     "nickname" : nickname,
  //     // "new_nickname" : new_nickname,
  //     "name_first" : name_first,
  //     "name_last" : name_last,
  //     "name_middle" : name_middle,
  //     "school_attending" : school_attending,
  //   }
  //   let response: any = await lastValueFrom(this.http.put<Response>(this.HTTP_URL + 'api/student/updateinfo',request));
  //   if (response.exception != null) {
  //     throw new Error(response.message);
  //   }
  //   return response;
  // }  
  */

}
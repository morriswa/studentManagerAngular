import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseResponse } from '../interface/response';
import { Course } from '../interface/course';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public message: string;

  private listOfStudents: Array<string> = Array("Not init :("); 

  public studentForm: FormGroup;

  constructor(private hs: HttpService, private ls: LoginService, private fb: FormBuilder) {
    this.message = "";
    this.hs.getAllStudents(this.ls.getLogin()).then(promise => {
      this.listOfStudents = promise;
    }).catch(err => {
      this.listOfStudents = Array("Please log in");
    });

    this.studentForm = this.fb.group({
      "nickname" : ""
    })

  }

  ngOnInit(): void {
  }

  public async addStudent() {
    await this.hs.addNewStudent(this.ls.getLogin(), this.studentForm.get('nickname')?.value)
    .then(promise => {
      this.message = promise.message;
    }).catch(err => {
      console.warn(err);
      this.message = err.message;
    })
    this.refreshListOfStudents();
  }

  public async delStudent() {
    await this.hs.delStudent(this.ls.getLogin(), this.studentForm.get('nickname')?.value)
    .then(promise => {
      this.message = promise.message;
    }).catch(err => {
      console.warn(err);
      this.message = err.message;
    });
    this.refreshListOfStudents();
  }

  public async refreshListOfStudents() {
    await this.hs.getAllStudents(this.ls.getLogin())
    .then(promise => {
      this.listOfStudents = promise;
    }).catch(err => {
      console.warn(err);
      // this.message = err.message;
    });
  }

  public resetListOfStudents() {
    this.listOfStudents = Array<string>("Please log in");
  }

  public getListOfStudent(): Array<string> {
    return this.listOfStudents;
  }


  private courses: Course[] = Array();
  public async pullNewListOfCourses(nickname: string)
  {
    await this.hs.getAllCourses(this.ls.getLogin(),nickname)
    .then(promise => {
      this.courses = promise.courses;
    }).catch(err => {
      console.warn(err);
      this.courses = Array();
    })
  }

  public getListOfCourses() {
    return this.courses;
  }
}

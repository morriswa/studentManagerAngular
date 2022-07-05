import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  public courseForm: FormGroup;

  public readonly COURSE_TERMS: string[] = Array("FALL","WINTER","SPRING","SUMMER","OTHER")

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

    this.courseForm = this.fb.group({
      "year" : "",
      "term" : "",
      "title" : "",
      "creditHrs" : "",
      "gradepoint" : ""
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
  
  public async addCourse(nickname: string) {
    await this.hs.addCourse(
      this.ls.getLogin(),
      nickname,
      this.courseForm.get('year')?.value,
      this.courseForm.get('term')?.value,
      this.courseForm.get('title')?.value,
      this.courseForm.get('creditHrs')?.value,
      this.courseForm.get('gradepoint')?.value,
    ).then(promise => {
      this.pullNewListOfCourses(nickname);
    }).catch(err => {
      console.warn(err);
      this.message = err.message;
    })
    this.pullNewGradebook(nickname);
  }

  public async delCourse(nickname: string, id: number) {
    await this.hs.delCourse(
      this.ls.getLogin(),
      nickname,
      id
    ).then(promise => {
      this.pullNewListOfCourses(nickname);
    }).catch(err => {
      console.warn(err);
      this.message = err.message;
    })
    this.pullNewGradebook(nickname);
  }
  
  public getLetterGrade(course: Course): string {
    if (course.gradepoint >= 4) {
      return "A";
    }
    else if (course.gradepoint >= 3.7) {
      return "A-"
    }
    else if (course.gradepoint >= 3.3) {
      return "B+"
    }
    else if (course.gradepoint >= 3.0) {
      return "B"
    }
    else if (course.gradepoint >= 2.7) {
      return "B-"
    }
    else if (course.gradepoint >= 2.3) {
      return "C+"
    }
    else if (course.gradepoint >= 2.0) {
      return "C"
    }
    else if (course.gradepoint >= 1.7) {
      return "C-"
    }
    else if (course.gradepoint >= 1.3) {
      return "D+"
    }
    else if (course.gradepoint >= 1.0) {
      return "D"
    } 
    else if (course.gradepoint >= 0.7) {
      return "D-"
    }
    else if (course.gradepoint >= 0.0) {
      return "F"
    }
    else {
      return "?"
    }
    
  }

  public getGPAofStudent(student:string) {
    this.pullNewGradebook(student);
    return this.map.get("gpa");
  }

  public map: Map<string,string> = new Map();

  public async pullNewGradebook(student: string) {
    await this.hs.getStudentGradebookStats(this.ls.getLogin(),student)
    .then(promise => {
      this.map.set("gpa",promise[0]);
      this.map.set("credits",promise[1]);
      this.map.set("gps",promise[2]);
    }).catch(err => {
      console.warn(err);
      this.message = err.message
    });
  }
}

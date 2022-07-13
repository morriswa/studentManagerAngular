import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../interface/course';
import { ResponseType, StudentResponse } from '../interface/response';
import { AuthService } from '@auth0/auth0-angular';
import { Student } from '../interface/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  // CONST
  public readonly COURSE_TERMS: string[] = Array("FALL","WINTER","SPRING","SUMMER","OTHER")


  // PUBLIC
  public message: string;
  public studentInfo: StudentResponse;

  public studentForm: FormGroup;
  public courseForm: FormGroup;


  // PRIVATE
  private editProfileMode: boolean;

  private students: Map<string,Student> = new Map();
  private courses: Course[] = Array();


  // MATH 
  public calculateGPA(nickname: string) {
    let gradepoints = 0;
    let creditHrs = 0;

    this.courses.forEach(course => {
      gradepoints += (course.gradepoint*course.creditHrs);
      creditHrs += course.creditHrs;
    })

    return ((gradepoints / creditHrs).toFixed(2));
  }

  public calculateCreditHrs(nickname: string): number {
    let creditHrs = 0;

    this.courses.forEach(course => {
      creditHrs += course.creditHrs
    }) 

    return creditHrs;
  }

  public calculateGradepoints(nickname: string): number {
    let gradepoints = 0;

    this.courses.forEach(course => {
      gradepoints += (course.gradepoint*course.creditHrs);
    }) 

    return gradepoints;
  }


  // INIT
  constructor(private hs: HttpService, private auth0: AuthService, private fb: FormBuilder) {
    this.message = "";
    
    this.studentForm = this.fb.group({
      "name_first" : "",
      "name_last" : "",
      "name_middle" : "",
      "nickname" : "",
      "school_attending" : "",
    })

    this.courseForm = this.fb.group({
      "year" : "",
      "term" : "",
      "title" : "",
      "creditHrs" : "",
      "gradepoint" : ""
    })

    this.studentInfo = {
      "status" : ResponseType.OK,
      "message" : "not initialized",
      "student" : {
        "id" : 0,
        "name_first" : "",
        "name_last" : "",
        "name_middle" : "",
        "nickname" : "",
        "school_attending" : "",
        "user" : JSON
      },
      "courses" : [],
      "creditHrs" : 0,
      "gpa" : 0.0,
      "gradepoints" : 0.0
    }

    this.editProfileMode = false;

  }

  ngOnInit(): void {
    this.refreshListOfStudents();
  }


  // GETTER SETTER
  public getListOfStudent(): string[] {
    let returnArray: string[] = new Array();
    for (let key in this.students) {
        returnArray.push(key);
    }
    return returnArray;
  }

  public getListOfCourses(): Array<Course> {
    return this.courses;
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


  // ONCLICK 
  public async addStudent() {
    await this.hs.v2studentAdd(this.studentForm.get('nickname')?.value)
    .then(promise => {
      this.studentForm.reset();
      this.students = promise;
    }).catch(err => {
      console.warn(err);
      this.message = err.message;
    })
  }

  public async delStudent() {
    await this.hs.v2studentDel(this.studentForm.get('nickname')?.value)
    .then(promise => {
      this.studentForm.reset();
      this.students = promise;
    }).catch(err => {
      console.warn(err);
      this.message = err.message;
    });
  }

  public async addCourse(nickname: string) {
    await this.hs.v2courseAdd(
      nickname,
      this.courseForm.get('year')?.value,
      this.courseForm.get('term')?.value,
      this.courseForm.get('title')?.value,
      this.courseForm.get('creditHrs')?.value,
      this.courseForm.get('gradepoint')?.value,
    ).then(promise => {
      this.courseForm.reset();
      this.courses = promise;
      this.loadStudent(nickname);
    }).catch(err => {
      console.warn(err);
      this.message = err.message;
      this.loadStudent(nickname);
    })
  }

  public async delCourse(nickname: string,id: number) {
    await this.hs.v2courseDel(
      nickname,
      id
    ).then(promise => {
      this.courseForm.reset();
      this.courses = promise;
      this.loadStudent(nickname);
    }).catch(err => {
      console.warn(err);
      this.message = err.message;
      this.loadStudent(nickname);
    })
  }


//   public async saveEditProfile(nickname:string) {
//     await this.hs.updateStudentInfo(
//       nickname,
//       // this.studentForm.get('nickname')?.value,
//       this.studentForm.get('name_first')?.value,
//       this.studentForm.get('name_last')?.value,
//       this.studentForm.get('name_middle')?.value,
//       this.studentForm.get('school_attending')?.value,
//     ).then(promise => {
//       this.toggleEditProfileMode();
//       this.studentForm.reset();
//       this.loadStudent(nickname)
//       this.message = promise.message;
//     }).catch(err => {
//       this.toggleEditProfileMode();
//       console.warn(err);
//       this.message = err.message;
//     })

//   }


//   // HELPERS
  
  public async refreshListOfStudents() {
    this.students = await this.hs.v2studentGetAll();
  }

  public resetListOfStudents(): void {
    this.students = new Map();
  }

//   public toggleEditProfileMode(): void {
//     this.editProfileMode = !this.editProfileMode;
//     // return this.editProfileMode;
//   }

  public async loadStudent(nick: string) {
    await this.hs.v2studentLoad(nick)
    .then(promise => {
      this.courses = promise;
    }).catch(err => {
      console.warn(err);
      this.courses = new Array();
    })
  }

}

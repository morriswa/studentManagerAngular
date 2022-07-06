import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../interface/course';
import { ResponseType, StudentResponse } from '../interface/response';

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

  private listOfStudents: Array<string> = Array("Not init :("); 
  private courses: Course[] = Array();


  // INIT
  constructor(private hs: HttpService, private ls: LoginService, private fb: FormBuilder) {
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
    this.hs.getAllStudents(this.ls.getLogin()).then(promise => {
      this.listOfStudents = promise;
    }).catch(err => {
      this.listOfStudents = Array("Please log in");
    });

    this.editProfileMode = false;
  }


  // GETTER SETTER
  public getListOfStudent(): Array<string> {
    return this.listOfStudents;
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

  public getGPAofStudent(student:string): number {
    this.loadStudent(student);
    return this.studentInfo.gpa;
  }

  public isEditProfileMode(): boolean {
    return this.editProfileMode;
  }


  // ONCLICK 
  public async addStudent() {
    let newStudent: string = this.studentForm.get('nickname')?.value;
    await this.hs.addNewStudent(this.ls.getLogin(), newStudent)
    .then(promise => {
      this.studentForm.reset();
      this.message = promise.message;
      this.loadStudent(newStudent);
    }).catch(err => {
      console.warn(err);
      this.message = err.message;
    })
    this.refreshListOfStudents();
  }

  public async delStudent() {
    await this.hs.delStudent(this.ls.getLogin(), this.studentForm.get('nickname')?.value)
    .then(promise => {
      this.studentForm.reset();
      this.message = promise.message;
    }).catch(err => {
      console.warn(err);
      this.message = err.message;
    });
    this.refreshListOfStudents();
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
      this.courseForm.reset();
      this.message = promise.message;
      this.loadStudent(nickname);
    }).catch(err => {
      console.warn(err);
      this.message = err.message;
      this.loadStudent(nickname);
    })
  }

  public async delCourse(nickname: string, id: number) {
    await this.hs.delCourse(
      this.ls.getLogin(),
      nickname,
      id
    ).then(promise => {
      this.loadStudent(nickname);
    }).catch(err => {
      console.warn(err);
      this.message = err.message;
    })
    this.loadStudent(nickname);
  }

  public async saveEditProfile(nickname:string) {
    await this.hs.updateStudentInfo(
      this.ls.getLogin(),
      nickname,
      // this.studentForm.get('nickname')?.value,
      this.studentForm.get('name_first')?.value,
      this.studentForm.get('name_last')?.value,
      this.studentForm.get('name_middle')?.value,
      this.studentForm.get('school_attending')?.value,
    ).then(promise => {
      this.toggleEditProfileMode();
      this.studentForm.reset();
      this.loadStudent(nickname)
      this.message = promise.message;
    }).catch(err => {
      this.toggleEditProfileMode();
      console.warn(err);
      this.message = err.message;
    })

  }


  // HELPERS
  public async refreshListOfStudents(): Promise<void> {
    await this.hs.getAllStudents(this.ls.getLogin())
    .then(promise => {
      this.listOfStudents = promise;
    }).catch(err => {
      console.warn(err);
      this.resetListOfStudents();
      // this.message = err.message;
    });
  }

  public resetListOfStudents(): void {
    this.listOfStudents = Array<string>("Please log in");
  }

  public toggleEditProfileMode(): void {
    this.editProfileMode = !this.editProfileMode;
    // return this.editProfileMode;
  }

  public async loadStudent(student: string): Promise<void> {
    await this.hs.loadStudent(this.ls.getLogin(),student)
    .then(promise => {
      this.studentInfo = promise;
      this.courses = promise.courses;
    }).catch(err => {
      console.warn(err);
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
      this.message = err.message;
      this.courses = Array();
    });
  }


  // DEV JUNK
  /* public async pullNewListOfCourses(nickname: string)
  {
    await this.hs.loadStudent(this.ls.getLogin(),nickname)
    .then(promise => {
      this.courses = promise.courses;
    }).catch(err => {
      console.warn(err);
      this.courses = Array();
    })
  } */

  /* public async pullNewGradebook(student: string) {
    await this.hs.getStudentGradebookStats(this.ls.getLogin(),student)
    .then(promise => {
      this.map.set("gpa",promise[0]);
      this.map.set("credits",promise[1]);
      this.map.set("gps",promise[2]);
    }).catch(err => {
      console.warn(err);
      this.message = err.message
    });
  } */

}

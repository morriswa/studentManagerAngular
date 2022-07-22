import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../interface/course';
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


  // PUBLIC DAO
  public message: string;
  public studentForm: FormGroup;
  public courseForm: FormGroup;


  // PRIVATE STATES
  private editProfileMode: boolean;
  private students: Map<string,Student>;
  private listOfStudents: Student[]; 
  private courses: Course[];


  // INIT
  constructor(private hs: HttpService, private auth0: AuthService, private fb: FormBuilder) {
    this.message = "";
    this.studentForm = this.fb.group({
      "pronouns" : "",
      "name_first" : "",
      "name_last" : "",
      "name_middle" : "",
      "nickname" : "",
      "school_attending" : "",
    });
    this.courseForm = this.fb.group({
      "year" : "",
      "term" : "",
      "title" : "",
      "creditHrs" : "",
      "gradepoint" : ""
    });
    this.editProfileMode = false;
    this.students = new Map();
    this.listOfStudents = new Array();
    this.courses = new Array();
  }

  ngOnInit(): void {
    this.refreshMapOfStudents();
  }


  // GETTER SETTER
  public getProfileEditMode(): boolean {
    return this.editProfileMode;
  }

  public getListOfStudent(): Student[] {
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

  public getProfilePronouns(student: Student): string {
    return student.pronouns;
  }

  public getProfileNameFirst(student: Student): string {
    return student.name_first;
  }

  public getProfileNameMiddle(student: Student): string {
    return student.name_middle;
  }

  public getProfileNameLast(student: Student): string {
    return student.name_last;
  }

  public getProfileSchoolAttending(student: Student): string {
    return student.school_attending;
  }

  public calculateGPA(nickname: string) {
    let gradepoints = 0;
    let creditHrs = 0;

    this.courses.forEach(course => {
      gradepoints += (course.gradepoint*course.creditHrs);
      creditHrs += course.creditHrs;
    })

    return ((gradepoints / creditHrs).toFixed(2));
  }

  public calculateCreditHrs(nickname: string) {
    let creditHrs = 0;

    this.courses.forEach(course => {
      creditHrs += course.creditHrs
    }) 

    return creditHrs;
  }

  public calculateGradepoints(nickname: string) {
    let gradepoints = 0;

    this.courses.forEach(course => {
      gradepoints += (course.gradepoint*course.creditHrs);
    }) 

    return gradepoints.toFixed(2);
  }


  // SETTER 
  public toggleEditProfileMode(): void {
    this.editProfileMode = !this.editProfileMode;
    // return this.editProfileMode;
  }


  // ONCLICK 
  public addStudent() {
    this.hs.v2studentAdd(this.studentForm.get('nickname')?.value)
    .subscribe({
      next : (obs) => {
        this.students = Object.assign(new Map<String,Student>,obs);
        this.listOfStudents = Object.values(this.students);
        this.studentForm.reset();
        this.message = "Student added successfully!";
      }, error : (err) => {
        this.message = err.error.message;
      }
    });
  }

  public delStudent() {
    this.hs.v2studentDel(this.studentForm.get('nickname')?.value)
    .subscribe({
      next: (obs) => {
        this.students = Object.assign(new Map<String,Student>,obs);
        this.listOfStudents = Object.values(this.students);
        this.studentForm.reset();    
        this.message = "Student deleted successfully!";
      }, error : (err) => {
        this.message = err.error.message;
      }
    });
  }

  public addCourse(nickname: string) {
    this.hs.v2courseAdd(
      nickname,
      this.courseForm.get('year')?.value,
      this.courseForm.get('term')?.value,
      this.courseForm.get('title')?.value,
      this.courseForm.get('creditHrs')?.value,
      this.courseForm.get('gradepoint')?.value,
    ).subscribe(obs => {
      this.courses = Object.create(obs);
      this.courseForm.reset();
    });
  }

  public delCourse(nickname: string,id: number) {
    this.hs.v2courseDel(nickname, id
    ).subscribe(obs => {
      this.courses = Object.create(obs);
    })
  }

  public sendUpdateStudentInfoRequest(nick: string) {
    this.hs.v2updsteStudentInfo(
      nick,
      this.studentForm.get('pronouns')?.value,
      this.studentForm.get('name_first')?.value,
      this.studentForm.get('name_middle')?.value,
      this.studentForm.get('name_last')?.value,
      this.studentForm.get('school_attending')?.value,
    ).subscribe({
      next: (obs) => {
        this.toggleEditProfileMode();
        this.refreshMapOfStudents();
        this.studentForm.reset();
      }, error : (err) => console.error(err)
    });
  }

  
  // SERVICE OBSERVER
  public refreshMapOfStudents() {
    this.hs.v2studentGetAll().subscribe(obs => {
      this.students = Object.assign(new Map<String,Student>,obs);
      this.listOfStudents = Object.values(this.students);
    });
  }

  public refreshListOfCourses(nick: string) {
    this.hs.v2studentLoad(nick).subscribe(obs => {
      this.courses = Object.create(obs);
    });
  }

}

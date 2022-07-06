import { Course } from "./course";
import { Student } from "./student";

export interface Response {
    status: ResponseType;
    message: string;
}

export interface ErrorResponse {
    status: ResponseType;
    message: string;
    exception: any;
    trace?: any;
}

export interface CourseResponse {
    courses: Array<Course>;
    status: ResponseType;
    message: string;
}

export interface StudentResponse {
    status: ResponseType;
    message: string;

    student: Student;
    courses: Course[];
    creditHrs: number;
    gpa: number;
    gradepoints: number;
}

export enum ResponseType {
    OK,ERROR
}
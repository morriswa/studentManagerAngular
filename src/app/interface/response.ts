import { Course } from "./course";

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

export enum ResponseType {
    OK,ERROR
}
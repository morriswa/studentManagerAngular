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

export enum ResponseType {
    OK,ERROR
}
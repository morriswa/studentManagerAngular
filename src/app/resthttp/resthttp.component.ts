import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '../interface/response';

@Component({
  selector: 'app-resthttp',
  templateUrl: './resthttp.component.html',
  styleUrls: ['./resthttp.component.css']
})
export class ResthttpComponent {

  readonly HTTP_URL: string = 'http://localhost:8080';
  message: string = "no data yet";
  constructor(private http: HttpClient) { }

  sayHi() {
    this.http.get<Response>(this.HTTP_URL + '/hello').subscribe(response => {
      this.message = response.message;
    });
  }
}

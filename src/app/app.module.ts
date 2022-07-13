import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';


import { AppRoutingModule } from './app-routing.module';
import { HttpService } from './http.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';

import {environment as env } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    AuthModule.forRoot({
      domain: 'dev-9deub659.us.auth0.com',
      clientId: '73UVkM0NOBhxYZOPgntG2Eu0wB6WOA08',

      // Request this audience at user authentication time
      audience: 'http://localhost:8080/',

      // Request this scope at user authentication time
      scope: 'user',

      // Specify configuration for the interceptor              
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://YOUR_DOMAIN/api/v2/' (note the asterisk)
            uri: 'http://localhost:8080/api/*',
            tokenOptions: {
              // The attached token should target this audience
              audience: 'http://localhost:8080/',

              // The attached token should have these scopes
              scope: 'user'
            }
          }
        ]
      }
        })
      ],
      providers: [HttpService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }],
      bootstrap: [AppComponent]
})
export class AppModule { }

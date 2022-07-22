import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';

import { environment as env } from 'src/environments/environment';

@NgModule({
  declarations: 
  [
    AppComponent,
    LoginComponent,
    StudentComponent
  ],
  imports:
  [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCommonModule,
    MatSelectModule,
    MatDividerModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    AuthModule.forRoot(
    {
      domain: env.auth.domain,
      clientId: env.auth.clientId,

      // Request this audience at user authentication time
      audience: env.auth.audience,

      // Request this scope at user authentication time
      scope: 'read:students write:students',

      // Specify configuration for the interceptor              
      httpInterceptor: { allowedList: [
        {
          // Match any request that starts 'https://YOUR_DOMAIN/api/v2/' (note the asterisk)
          uri: env.auth.audience + '*',
          tokenOptions: {
            // The attached token should target this audience
            audience: env.auth.audience,

            // The attached token should have these scopes
            scope: 'read:students write:students'
          }
        }
      ]}
    })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

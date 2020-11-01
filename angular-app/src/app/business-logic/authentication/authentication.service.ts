import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // baseUrl = 'http://127.0.0.1:8000/api/auth'
  // baseUrl = 'https://terrain.gabrielrosa.dev/api-auth/'
  // username: general;
  // password: secretpassword

  baseUrl = 'https://terrain.gabrielrosa.dev/courses/api/'
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 21c208f7180cbd979574eace82e266641b1f2007'
  })


  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  // signIn(username: string, password: string) {
  // login() {
  //   return this.http.get(this.baseUrl, {
  //     headers: this.headers
  //   });
  // }

  login(authData) {
    // const body = JSON.stringify(authData);
    const body = JSON.stringify({
      username: "general",
      password: "secretpassword"
    });
    // return this.http.post(`${this.baseUrl}api-auth/`, body, {
    return this.http.post('https://terrain.gabrielrosa.dev/api-auth/', body, {
      headers: this.headers
    })
  }
}

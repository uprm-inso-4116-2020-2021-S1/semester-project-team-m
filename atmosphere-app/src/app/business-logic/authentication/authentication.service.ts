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

  baseUrl = 'https://terrain.gabrielrosa.dev/'
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  })


  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  login(authData) {
    // const body = JSON.stringify(authData);
    const body = JSON.stringify({
      username: "general",
      password: "secretpassword"
    });
    return this.http.post(`${this.baseUrl}api-auth/`, body, {
      headers: this.headers
    })
  }


  /* There is still no post crud for this */
  signup(authData) {
    console.log("There is still no post crud for this")

    // const body = JSON.stringify(authData);
    const body = JSON.stringify({
      username: "newuser",
      password: "secretpassword"
    });
    return this.http.post(`${this.baseUrl}api/user/`, body, {
      headers: this.getAuthHeaders()
    })
  }

  getAuthHeaders() {
    let token = this.cookieService.get('courses-token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    })
  }
}

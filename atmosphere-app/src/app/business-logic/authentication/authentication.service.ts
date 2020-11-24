import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = 'https://terrain.gabrielrosa.dev/'
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getAuthHeaders() {
    let token = this.cookieService.get('courses-token');
    console.log("token: ", token)

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    })
  }

  getUserInfo() {
    return this.http.get(`${this.baseUrl}api/user/`, {
      headers: this.getAuthHeaders(),
      responseType: 'json'
    })
  }

  signin(authData: Student) {
    // const body = JSON.stringify({
    //   username: authData.email,
    //   password: authData.password
    // });
    const body = JSON.stringify({
      username: "general",
      password: "secretpassword"
      // username: "test6@upr.edu",
      // password: "test6"
    });
    return this.http.post(`${this.baseUrl}api-auth/`, body, {
      headers: this.headers
    })
  }


  /* There is still no post crud for this */
  register(authData: Student) {
    console.log(authData)
    const body = JSON.stringify({
      // email: "test6@upr.edu",
      // password: "test6",
      // student_id: 802020202,
      email: authData.email,
      password: authData.password,
      student_id: authData.student_id,
      major: "INSO",
      curriculum_year: 2015,
    });

    return this.http.post(`${this.baseUrl}api/register/`, body, {
      headers: this.headers
    })
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseUrl = 'https://terrain.gabrielrosa.dev/'
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  getCourses() {
    return this.http.get(`${this.baseUrl}api/courses/`, {
      headers: this.authService.getAuthHeaders()
    })
  }
}
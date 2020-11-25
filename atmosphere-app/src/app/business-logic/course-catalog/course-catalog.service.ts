import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { Course } from '../models/course';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CourseCatalogService {
  baseUrl = 'https://terrain.gabrielrosa.dev/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  })



  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {

  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}api/courses/`, {
      headers: this.authService.getAuthHeaders(),
      responseType: 'json'
    }).pipe(map(courses => {
      return courses.map(data => {
        return new Course(
          data['code'],
          data['title'],
          data['worth'],
          data['pre'],
          data['curriculum']
        )
      })
    }))
  }

  getMyCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}api/mycourses/`, {
      headers: this.authService.getAuthHeaders(),
      responseType: 'json'
    }).pipe(map(mycourses => {
      return mycourses.map(myData => {
        const c = myData['course'];
        // const fieldGrade = 69 - field.value.charCodeAt(0);

        // const grade = Number(69 - (myData['grade'] as string).charCodeAt(0));
        // console.log("grade")
        // console.log(grade)

        return new Course(
          c['code'],
          c['title'],
          c['worth'],
          c['pre'],
          c['curriculum'],
          myData['grade'],
          myData['term']
        )
      })
    }))
  }

  getCurriculum(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}api/curriculum/`, {
      headers: this.authService.getAuthHeaders(),
      responseType: 'json'
    }).pipe(map(courses => {
      return courses.map(data => {
        let grade = data['grade'] === null ? 'Choose Grade' : data['grade'];

        return new Course(
          data['code'],
          data['title'],
          data['worth'],
          data['pre'],
          data['curriculum'],
          grade,
          data['term'],
        )
      })
    }))
  }

  getCourseByCode(code: string): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}api/courses/${code}/`, {
      headers: this.authService.getAuthHeaders(),
      responseType: 'json'
    })
  }

  getMycourseByCode(code: string): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}api/mycourses/${code}/`, {
      headers: this.authService.getAuthHeaders(),
      responseType: 'json'
    })
  }

  postCourseToMycourse(course: Course) {
    let body = {
      code: course.code,
      grade: course.grade,
      term: course.term
    }

    // const body = JSON.stringify({
    //   username: "newuser",
    //   password: "secretpassword"
    // });
    return this.http.post(`${this.baseUrl}api/mycourses/`, body, {
      headers: this.authService.getAuthHeaders(),
      responseType: 'json'
    })
  }

  deleteCourseByCode(code: string) {
    return this.http.delete(`${this.baseUrl}api/mycourses/${code}/`, {
      headers: this.authService.getAuthHeaders(),
      responseType: 'json'
    })
  }
}

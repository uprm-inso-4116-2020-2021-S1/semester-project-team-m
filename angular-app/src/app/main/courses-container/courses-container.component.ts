import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CourseService } from 'src/app/business-logic/course/course.service';

@Component({
  selector: 'app-courses-container',
  templateUrl: './courses-container.component.html',
  styleUrls: ['./courses-container.component.css']
})
export class CoursesContainerComponent implements OnInit {
  public courses = []

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    const token = this.cookieService.get('courses-token')
    if (!token) {
      this.router.navigate(['/auth'])
    }

    this.courseService.getCourses().subscribe(
      courses => {
        console.log(courses)
        // for (let i = 0; i < courses; i++) {
        //   this.courses.push(courses[i])
        //   console.log(courses[i])
        // }
        // console.log(this.courses)
      },
      error => { console.log(error) }
    )
  }

  logout() {
    this.cookieService.delete('courses-token');
    this.router.navigate(['auth']);
  }
}

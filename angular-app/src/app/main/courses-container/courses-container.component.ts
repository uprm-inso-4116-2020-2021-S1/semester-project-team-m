import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CourseService } from 'src/app/business-logic/course/course.service';

interface Course {
  code: string;
  title: string;
  worth: number;
  pre: string[];
  grade?: string;

}

@Component({
  selector: 'app-courses-container',
  templateUrl: './courses-container.component.html',
  styleUrls: ['./courses-container.component.css']
})
export class CoursesContainerComponent implements OnInit {
  public courses = []
  public displayedColumns = [
    'course_code',
    'title',
    'worth',
    // 'grade',
    'pre'
  ]
  // dataSource: MatTableDataSource<any>(data);

  dataSource = new MatTableDataSource(this.courses)
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
        // this.dataSource = new MatTableDataSource<any>(courses);
        console.log(typeof (courses))
        console.log(courses)
        console.log(this.courses)

        this.courses.forEach(c => {
          console.log(c)
        })

        // obj = {
        //   1: 's'
        // }


        // for (let c of obj)
        //   console.log(c)

        // for (let i = 0; i < courses; i++)
        //   this.courses.push(courses[i])

      },
      error => { console.log(error) }
    )
  }

  logout() {
    this.cookieService.delete('courses-token');
    this.router.navigate(['auth']);
  }
}

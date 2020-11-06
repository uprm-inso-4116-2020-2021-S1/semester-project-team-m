import {Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CourseService } from 'src/app/business-logic/course/course.service';
import {Observable} from "rxjs";
import {MatSort} from "@angular/material/sort";

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
    'grade',
    'pre',
    'hp'
  ]

  // dataSource: MatTableDataSource<any>(data);
  public dataSource

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private courseService: CourseService
  ) {

  }

  ngOnInit() {
    const token = this.cookieService.get('courses-token')
    if (!token) {
      this.router.navigate(['/auth'])
    }

      this.dataSource =this.courses

    this.courseService.getCourses().subscribe(
      courses => {
        this.dataSource = new MatTableDataSource(<any> courses);
        console.log(this.dataSource.data);
      },
      error => { console.log(error) }
    )
  }

  logout() {
    this.cookieService.delete('courses-token');
    this.router.navigate(['auth']);
  }
}

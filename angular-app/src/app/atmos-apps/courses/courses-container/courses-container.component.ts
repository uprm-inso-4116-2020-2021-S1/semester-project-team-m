import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CourseService } from 'src/app/business-logic/course/course.service';
import { Observable } from "rxjs";
import { MatSort } from "@angular/material/sort";

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

    this.dataSource = this.courses

    this.courseService.getCourses().subscribe(
      courses => {
        this.dataSource = new MatTableDataSource(<any>courses);
        console.log(this.dataSource.data);
      },
      error => { console.log(error) }
    )

    // this.courseService.getCourses().subscribe(
    //   courses => {
    //     if (typeof courses === "string") {
    //       console.log(this.dataSource = new MatTableDataSource(JSON.parse(courses)))
    //     }
    //     console.log(typeof (this.dataSource.data))
    //     console.log(this.dataSource.data)
    //     console.log(this.courses)

    //     this.courses.forEach(c => {
    //       console.log(c)
    //     })

    //     // this.courseService.getCourses(res => {console.log(res); this.courses = res});



    //     // obj = {
    //     //   1: 's'
    //     // }


    //     // for (let c of obj)
    //     //   console.log(c)

    //     // for (let i = 0; i < courses; i++)
    //     //   this.courses.push(courses[i])

    //   },
    //   error => { console.log(error) }
    // )
  }
}

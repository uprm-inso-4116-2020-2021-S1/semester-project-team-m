import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseCatalogService } from 'src/app/business-logic/course-catalog/course-catalog.service';
import { Course } from 'src/app/business-logic/models/course';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  @Output() onFinished = new EventEmitter<string>();
  @Input() course: Course;

  constructor(
    private courseCatalogService: CourseCatalogService,
  ) { }

  get getTitle() { return this.course.title }
  get getWorth() { return this.course.worth }
  get getTerm() { return this.course.term }
  get getGrade() { return this.course.grade }
  get getPre() { return this.course.pre }

  get getCode() {
    let code = this.course.code;
    return code.substr(0, 4) + ' ' + code.substr(4)
  }


  ngOnInit() {
    this.courseCatalogService.getMycourseByCode(this.course.code).subscribe(mycourse => {
      console.log(this.course)
      console.log(mycourse);
      this.course.grade = (mycourse.grade) ? mycourse.grade : 'Course not taken'
      this.course.term = mycourse.term;
    })
  }

  deleteFromMycourses() {
    this.courseCatalogService.deleteCourseByCode(this.course.code).subscribe(_ => {
      this.onFinished.emit('details')
    })
  }
}

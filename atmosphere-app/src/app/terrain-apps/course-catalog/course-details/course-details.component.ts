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
    private router: Router
  ) {
    this.courseCatalogService.getMyCourses().subscribe(mycourses => {
      this.removeCoursesNotTaken(mycourses);
      this.course.grade = (mycourses.length > 0) ? mycourses[0].grade : 'Course not taken';
      this.course.term = (mycourses.length > 0) ? mycourses[0].term : 'N/A';

      console.log(mycourses)
    },
      error => { console.log(error) }
    )
  }

  get getTitle() { return this.course.title }
  get getWorth() { return this.course.worth }
  get getTerm() { return this.course.term }
  get getGrade() { return this.course.grade }

  get getCode() {
    let code = this.course.code;
    return code.substr(0, 4) + ' ' + code.substr(4)
  }


  get getPre() {
    return this.course.pre
  }

  ngOnInit() { }


  /** Removes the courses that the user has not taken yet */
  removeCoursesNotTaken(mycourses: Course[]): void {
    // mycourses.filter(c => c.code == this.course.code); //filter function no funciona :(
    for (let i = 0; i < mycourses.length; i++) {
      const c = mycourses[i];
      if (c.code != this.course.code)
        mycourses.splice(i--, 1);
    }
  }

  deleteFromMycourses() {
    this.courseCatalogService.deleteCourseByCode(this.course.code).subscribe(_ => {
      console.log('>', 'sup');
      this.onFinished.emit('details')
    })
  }


  // /** returns the grade given course array with only one course */
  // /**  
  //  * returns the grade of course within the given array that contains the this.course 
  //  * 
  //  * given course array with only one course */
  // /**
  //  * 
  //  * Removes
  //  */
  // getCourseGrade(mycourses: Course[]): string {
  //   // mycourses.filter(c => c.code == this.course.code); //filter function no funciona :(
  //   for (let i = 0; i < mycourses.length; i++) {
  //     const c = mycourses[i];
  //     if (c.code != this.course.code)
  //       mycourses.splice(i--, 1);
  //   }
  //   return (mycourses.length > 0) ? mycourses[0].grade : 'Course not taken';
  // }
}

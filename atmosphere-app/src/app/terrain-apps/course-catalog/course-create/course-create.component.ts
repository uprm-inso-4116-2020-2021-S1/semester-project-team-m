import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CourseCatalogService } from 'src/app/business-logic/course-catalog/course-catalog.service';
import { Course } from 'src/app/business-logic/models/course';
import { ToastService } from 'src/app/business-logic/toast/toast.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  @Output() onFinished = new EventEmitter<string>();

  // public courseForm: FormGroup;
  code: string;
  grade: string;
  term: string;

  constructor(
    private toast: ToastService,
    private courseCatalogService: CourseCatalogService,
  ) { }

  ngOnInit(): void { }

  addToMycourse() {
    //harcode for testing
    // const newCourse = new Course(
    //   "INGE3011",
    //   "",
    //   0,
    //   [],
    //   [],
    //   "D",
    //   "2019",
    // );
    const newCourse = new Course(
      this.code,
      "",
      0,
      [],
      [],
      this.grade,
      this.term,
    )

    this.courseCatalogService.getMycourseByCode(newCourse.code).subscribe(c => {
      if (c.grade == null) {
        this.toast.errorToast('A course with code <' + newCourse.code + '> provided does not exist within curriculum')
      }
      else
        this.courseCatalogService.postCourseToMycourse(newCourse).subscribe(res => console.log(res));
    },
      error => {
        console.log(error)
      })
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

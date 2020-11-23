import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseCatalogService } from 'src/app/business-logic/course-catalog/course-catalog.service';
import { Course } from 'src/app/business-logic/models/course';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
  @Output() onFinished = new EventEmitter<string>();

  // public courseForm: FormGroup;
  code: string;
  grade: string;
  term: string;

  constructor(
    // private formBuilder: FormBuilder,
    private courseCatalogService: CourseCatalogService,
  ) { }

  ngOnInit(): void {
    // this.courseForm = this.formBuilder.group({
    //   code: [''],
    //   grade: [''],
    //   term: [''],

    //   // email: ['', [Validators.required, Validators.email]],
    //   // password: ['', [Validators.required, Validators.minLength(8)]],
    // })
  }

  addToMycourse() {
    // const f = this.courseForm;
    // const newCourse = new Course(
    //   f.get('code').value,
    //   f.get('title').value,
    //   f.get('worth').value,
    //   f.get('grade').value,
    //   f.get('term').value
    // );
    const newCourse = new Course(
      // this.code,
      // "",
      // "",
      // [],
      // [],
      // this.grade,
      // this.term,
      "QUIM3131",
      "",
      0,
      [],
      [],
      "F",
      "2020",
    );

    this.courseCatalogService.getCurriculum().subscribe(courses => {
      // mycourses.filter(c => c.code == this.course.code); //filter function no funciona :(
      // let i = courses.length - 1;
      let i = 10;
      for (; i >= 0; i--)
        if (newCourse.code == courses[i].code)
          break;

      if (i >= 0) {
        console.log(newCourse);

        this.courseCatalogService.postCourseToMycourse(newCourse)
        this.onFinished.emit('create')
      }
      else {
        alert('Course with the code provided does not exist')
      }
      // for (let i = 0; i < courses.length; i++) {
      //   const c = courses[i];
      //   if (newCourse.code == c.code)

      // }
    })
  }
}

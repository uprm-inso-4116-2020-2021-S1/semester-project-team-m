import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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
  public codeOptions: string[] = [];
  public codeForm = new FormControl('Choose Code');
  // public code: string;
  public grade: string;
  public term: string;

  constructor(
    private courseCatalogService: CourseCatalogService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.courseCatalogService.getCurriculum().subscribe(courses => {
      courses.forEach(c => {
        this.codeOptions.push(c.code)
      })
    })
  }

  addToMycourse() {
    if (!this.grade)
      this.toast.infoToast('Please provide the grade');
    else if (!this.term)
      this.toast.infoToast('Please provide the term (year)');
    else {
      console.log(this.codeForm.value)
      //harcode for testing
      const newCourse = new Course(
        "INGE3011",
        "",
        0,
        [],
        [],
        "B",
        "2020",
      );
      // const newCourse = new Course(
      //   this.code,
      //   "",
      //   0,
      //   [],
      //   [],
      //   this.grade,
      //   this.term,
      // )

      this.courseCatalogService.getMycourseByCode(newCourse.code).subscribe(c => {
        this.courseCatalogService.postCourseToMycourse(newCourse).subscribe(_ => {
          this.router.navigate(['/home/apps', { "componentToRerouteTo": 'catalog' }]);
        });
      },
        error => {
          console.log(error)
        })
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

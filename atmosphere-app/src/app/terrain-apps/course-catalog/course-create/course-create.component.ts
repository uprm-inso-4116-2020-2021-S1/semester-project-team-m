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
  public gradeOptions: string[] = [];
  public gradeForm = new FormControl('Choose Grade');
  // public code: string;
  // public grade: string;
  public term: number;

  constructor(
    private courseCatalogService: CourseCatalogService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.gradeOptions.push('A')
    this.gradeOptions.push('B')
    this.gradeOptions.push('C')
    this.gradeOptions.push('D')
    this.gradeOptions.push('F')

    this.courseCatalogService.getCurriculum().subscribe(courses => {
      courses.forEach(c => {
        this.codeOptions.push(c.code)
      })
    })
  }

  addToMycourse() {
    console.log(!this.term, (this.term < 1980 && this.term > 2020))
    if (!this.codeForm.value || this.codeForm.value === 'Choose Code')
      this.toast.infoToast('Please provide the code');
    else if (!this.gradeForm.value || this.gradeForm.value.length > 1)
      this.toast.infoToast('Please provide the grade');
    else if (!this.term)
      this.toast.infoToast('Please provide the term (year)');
    else if (!this.term || (this.term < 1980 || this.term > 2020))
      this.toast.infoToast('Please provide a valid term')
    else {
      console.log(this.codeForm.value)
      //harcode for testing
      // const newCourse = new Course(
      //   "INGE3011",
      //   "",
      //   0,
      //   [],
      //   [],
      //   "A",
      //   "2020",
      // );
      const newCourse = new Course(
        this.codeForm.value,
        "",
        0,
        [],
        [],
        this.gradeForm.value,
        String(this.term),
      )

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


  /** Returns true if given string is numeric. */
  isNumeric(value: string): boolean {
    return value != null && !isNaN(Number(value));
  }
}

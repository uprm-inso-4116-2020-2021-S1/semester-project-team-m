import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CourseCatalogService } from 'src/app/business-logic/course-catalog/course-catalog.service';
import { empty, Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { Course } from '../../../business-logic/models/course'
import { FormControl } from '@angular/forms';

/** Reference of a specific input field within the advance search. */
class SearchField<E> {
  public value: E;
  constructor(v: E) { this.value = v; }
}
@Component({
  selector: 'app-course-catalog-container',
  templateUrl: './course-catalog-container.component.html',
  styleUrls: ['./course-catalog-container.component.css']
})
export class CourseCatalogContainerComponent implements OnInit {
  @Output() onFinished = new EventEmitter<boolean>();

  public dataSource = new MatTableDataSource<Course>();
  @ViewChild(MatPaginator) paginator: MatPaginator; // For pagination
  @ViewChild(MatSort) sort: MatSort; // For Sort
  public displayedColumns = [
    'course_code',
    'title',
    'worth',
    'grade', //mat-select
    'pre',
    'honor', //grade * worth
    'view'
  ]
  public genIn;

  public viewAdvancedFilter = false;
  public viewAddCourse = false;
  // public deletedCourseCode: string;
  // public viewAllCourses = false; //should be false by default
  public selectedCourse: Course;
  // public selectedCourse = new Course(
  //   "ESPA3101",
  //   "Spanish I Basic",
  //   3,
  //   [],
  //   [],
  //   "D",
  //   "fall"
  // );

  // course lists
  public originalCourses: Course[] = []; //: Course[];
  public filteredCourses: Course[] = []; //: Course[] = [];
  public mycourses: Course[] = [];

  // input fields configurations

  public MAX_INPUTS = 3;  // maximum input fields in advanced search
  public codeFields: SearchField<string>[] = [];
  public titleFields: SearchField<string>[] = [];
  public preFields: SearchField<string>[] = [];
  public gradeFields: SearchField<string>[] = [];

  // list of Grades options
  public gradeOptions: string[] = [];
  public grade = new FormControl('Choose Grade');

  //user gpa var
  public userGPA = '';

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private changeDetector: ChangeDetectorRef,
    private courseCatalogService: CourseCatalogService,
  ) { }

  ngOnInit() {
    if (!this.cookieService.get('courses-token'))
      this.router.navigate(['/auth'])

    this.codeFields.push(new SearchField(''));
    this.titleFields.push(new SearchField(''));
    this.preFields.push(new SearchField(''));
    this.gradeFields.push(new SearchField(''));

    this.gradeOptions.push('A')
    this.gradeOptions.push('B')
    this.gradeOptions.push('C')
    this.gradeOptions.push('D')
    this.gradeOptions.push('F')

    this.courseCatalogService.getMyCourses().subscribe(
      mycourses => {
        // this.originalCourses = mycourses;
        // this.dataSource.data = mycourses;
        // this.mycourses = mycourses;
        // this.originalCourses = this.dataSource.data = mycourses;
      },
      error => { console.log(error) }
    )

    this.courseCatalogService.getCurriculum().subscribe(courses => {
      console.log(courses)
      this.originalCourses = this.dataSource.data = courses;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
      error => { console.log(error) }
    )
  }

  displayCourseAdd() {
    this.viewAddCourse = true;
  }

  displayCourse(code: string) {
    this.viewAdvancedFilter = false;
    // this.viewCourseDetail = true;
    this.courseCatalogService.getCourseByCode(code).subscribe(course => {
      // console.log(course);
      this.selectedCourse = course
    })
  }

  goBack(cameFrom?: string): void {
    // console.log('-----------')
    if (this.selectedCourse)
      this.selectedCourse = undefined;
    else if (this.viewAddCourse) {
      this.viewAddCourse = false;
      // this.updateStudentsTable();
    }
    else if (cameFrom === 'create' || cameFrom === 'details')
      this.updateStudentsTable();
    else
      this.router.navigate(['home/apps']);

    // const asyncFunc = course => {
    //   if (course.code == codeToDelete) {
    //     console.log('\n\nFound\n\n', course)
    //     course.code = ''
    //     this.changeDetector.detectChanges()
    //   }
    // }
    // Promise.all(this.dataSource.data.map(async (c) => asyncFunc(c)));
  }

  calculateGPA(): void {
    this.userGPA = ''
    let total_points = 0;
    let total_credits = 0;
    for (let row of this.dataSource.data) {
      //2 is current index of credit worth
      //5 is current index of gpa points
      console.log(row.grade);
      if (row.grade == 'A') {
        total_points += row.worth * 4;
        total_credits += row.worth;
      }
      if (row.grade == 'B') {
        total_points += row.worth * 3;
        total_credits += row.worth;
      }
      if (row.grade == 'C') {
        total_points += row.worth * 2;
        total_credits += row.worth;
      }
      if (row.grade == 'D') {
        total_points += row.worth;
        total_credits += row.worth;
      }
      if (row.grade == 'F') {
        total_credits += row.worth;
      }
    }
    if (total_credits > 0) this.userGPA += (total_points / total_credits).toFixed(2);
    else this.userGPA = '';
  }




  /* ----------------     Advance Filter Section     ---------------- */

  /** Returns true if given array length is larger than zero and doesn't
   *   exceed maximum amount of input fields.  False otherwise. */
  validAmountToAdd(arr: SearchField<any>[]): boolean {
    return arr.length > 0 && arr.length < this.MAX_INPUTS;
  }

  addCodeField() { this.codeFields.push(new SearchField('')); }
  addTitleField() { this.titleFields.push(new SearchField('')); }
  addPreField() { this.preFields.push(new SearchField('')); }
  addGradeField() { this.gradeFields.push(new SearchField('')); }

  /** Assigns the selected grade into the given search field's value. */
  selectGrade(gradeField: SearchField<string>, selectedGrade: string) {
    gradeField.value = (gradeField.value.length > 1) ? ' ' : selectedGrade;
  }

  updateStudentsTable() {
    this.courseCatalogService.getCurriculum().subscribe(courses => {
      this.originalCourses = this.dataSource.data = courses;
    },
      error => { console.log(error) }
    )
  }

  activateAdvancedFilter() {
    this.viewAdvancedFilter = true;
    this.cloneOriginal();
  }

  undoFilter() {
    this.viewAdvancedFilter = false;
    this.dataSource.data = this.originalCourses; // resets student table
    this.cloneOriginal();
  }

  /** Pushes all original students to the clone array (filteredStuds). */
  cloneOriginal() {
    this.originalCourses.forEach(course => {
      this.filteredCourses.push(course);
    });
  }

  /** Returns true if at least one of the code search fields
   *   contains the given course's code.  False otherwise. */
  codeWorthyToFilter(course): boolean {
    if (this.emptySearchFields(this.codeFields))
      return false;

    const code = course.code.toLowerCase();
    for (const field of this.codeFields) {
      const fieldCode = field.value.toLowerCase();
      if (code.indexOf(fieldCode) > -1) // course name contains fieldCode?
        return true;
    }
    return false;
  }

  /** Returns true if at least one of the title search fields
   *   contains the given course's title.  False otherwise. */
  titleWorthyToFilter(course): boolean {
    if (this.emptySearchFields(this.titleFields))
      return false;

    const title = course.title.toLowerCase();
    for (const field of this.titleFields) {
      const fieldTitle = field.value.toLowerCase();
      if (title.indexOf(fieldTitle) > -1) // course title contains fieldTitle?
        return true;
    }
    return false;
  }

  /** Returns true if at least one of the pre search fields
   *   contains the given course's prerequisite.  False otherwise. */
  preWorthyToFilter(course): boolean {
    if (this.emptySearchFields(this.preFields))
      return false;

    const pre = course.pre.toLowerCase();
    for (const field of this.preFields) {
      const fieldPre = field.value.toLowerCase();
      if (pre.indexOf(fieldPre) > -1) // course title contains fieldTitle?
        return true;
    }
    return false;
  }


  /** Returns true if at least one of the graduation date search fields
   *   contains the given student's graduation date.  False otherwise. */
  gradeWorthyToFilter(course: Course): boolean {
    if (this.emptySearchFields(this.gradeFields))
      return false;

    const grade = this.gradeToValue(course.grade);
    for (const field of this.gradeFields) {
      const fieldGrade = this.gradeToValue(field.value)
      if (undefined !== fieldGrade && grade === fieldGrade) // course's grade same as fieldGrade?
        return true;
    }
    return false;
  }

  gradeToValue(grade: string): number {
    if (grade.length > 1) return 0;
    let value = 69 - grade.charCodeAt(0);
    return (value === -1) ? 0 : value;
  }

  /** Filters students for all filled input fields */
  applyFilter() {
    this.filteredCourses = [];

    this.originalCourses.forEach(course => {
      if (this.codeWorthyToFilter(course) || this.titleWorthyToFilter(course)
        || this.preWorthyToFilter(course) || this.gradeWorthyToFilter(course)) {
        this.filteredCourses.push(course);
      }
    });

    if (this.filteredCourses.length > 0) {
      this.dataSource.data = this.filteredCourses; // table data references filtered
    } else {
      // this.toast.message('No course found with current filtering data');
      alert('No course found with current filtering data');
    }

    // update table
    this.changeDetector.detectChanges();

    // reset
    this.filteredCourses = [];
    this.cloneOriginal();
  }

  // calculateGpa() {
  //   for (let c of this.dataSource.data) {
  //     console.log(c);
  //     c['c']
  //   }
  // }

  /** Returns true if each string within the given search fields is empty */
  emptySearchFields(searchFields: SearchField<string>[] | string[]): boolean {
    for (const field of searchFields)
      if (((typeof field === 'string') ? field : field.value).length > 0)
        return false;
    return true;
  }

  /** Checks if each input field of each category () within the advance search. */
  allEmptyFields() {
    if (this.emptySearchFields(this.codeFields)
      && this.emptySearchFields(this.titleFields)
      && this.emptySearchFields(this.gradeFields)
      && this.emptySearchFields(this.preFields))
      return true;
    return false;
  }

  /** Removes all empty input search fields. */
  removeEmptyFields() {
    this.removeFilterField(this.codeFields);
    this.removeFilterField(this.titleFields);
    this.removeFilterField(this.gradeFields);
    this.removeFilterField(this.preFields);
  }

  /** Removes empty fields from the one given. */
  removeFilterField(searchFields: SearchField<string>[]): void {
    for (let i = 0; i < searchFields.length; i++)
      if (searchFields[i].value.length === 0)
        searchFields.splice(i--, 1)

    if (searchFields.length === 0)
      searchFields.push(new SearchField(''));
  }

  /** pushes all original students to the clone and filtered array.
   */
  copyOriginal() {
    this.originalCourses.forEach(course => {
      this.filteredCourses.push(course);
    });
  }

  /** Returns true if given string is numeric. */
  isNumeric(value: string): boolean {
    return value != null && !isNaN(Number(value));
  }
}

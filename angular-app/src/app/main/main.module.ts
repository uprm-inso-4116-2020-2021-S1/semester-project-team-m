import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesContainerComponent } from './courses-container/courses-container.component';
import {MatTableModule} from "@angular/material/table";

const routes: Routes = [
  // { path: 'home', component: MainComponent }
];

@NgModule({
  declarations: [
    // MainComponent,
    CourseListComponent,
    CourseDetailsComponent,
    CoursesContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatTableModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // ApiService,
  ]
})
export class MainModule { }

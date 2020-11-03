import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesContainerComponent } from './courses-container/courses-container.component';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

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
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // ApiService,
  ]
})
export class MainModule { }

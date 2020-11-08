import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from '@angular/material';
import { CourseCatalogContainerComponent } from './course-catalog-container/course-catalog-container.component';
import { MaterialModule } from '../../material.module'

const routes: Routes = [
  // { path: 'home', component: MainComponent }
];

@NgModule({
  declarations: [
    // MainComponent,
    CourseListComponent,
    CourseDetailsComponent,
    CourseCatalogContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MaterialModule
  ],
  exports: [
    RouterModule,
    CourseListComponent,
    CourseDetailsComponent,
    CourseCatalogContainerComponent
  ],
  providers: [
    // ApiService,
  ]
})
export class CourseCatalogModule { }

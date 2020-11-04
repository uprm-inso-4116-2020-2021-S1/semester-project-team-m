import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { HomeLayoutComponent } from './home-layout.component';
import { CoursesContainerComponent } from 'src/app/atmos-apps/courses/courses-container/courses-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  // { path: 'home', component: MainComponent }
];

@NgModule({
  declarations: [
    HomeLayoutComponent,
    CoursesContainerComponent,
    // CourseListComponent,
    // CourseDetailsComponent,
    // CoursesContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    SharedModule
    // RouterModule.forChild(routes),
    // MatTableModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatOptionModule,
    // MatSelectModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // ApiService,
  ]
})
export class HomeLayoutModule { }

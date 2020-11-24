import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule, MatCardModule, MatIconModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { CourseCatalogContainerComponent } from './course-catalog-container/course-catalog-container.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseCreateComponent } from './course-create/course-create.component';

// import { MaterialModule } from '../../material.module'

const routes: Routes = [
  // { path: 'home', component: MainComponent }
];

@NgModule({
  declarations: [
    CourseCatalogContainerComponent,
    CourseDetailsComponent,
    CourseCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    RouterModule,
    CourseDetailsComponent,
    CourseCatalogContainerComponent
  ],
  providers: []
})
export class CourseCatalogModule { }

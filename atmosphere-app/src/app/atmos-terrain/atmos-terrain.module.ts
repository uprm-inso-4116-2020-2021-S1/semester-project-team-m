import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// import { CourseListComponent } from '../course-list/course-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { TerrainContainerComponent } from './terrain-container/terrain-container.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    TerrainContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    SharedModule,
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AtmosTerrainModule { }

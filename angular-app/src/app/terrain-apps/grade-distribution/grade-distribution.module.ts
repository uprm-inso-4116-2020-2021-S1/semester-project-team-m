import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { GradeDistriContainerComponent } from './grade-distri-container/grade-distri-container.component'
import { MatTableModule } from '@angular/material/table';
import {
  MatButtonModule,
  MatCardModule,
} from '@angular/material';

@NgModule({
  declarations: [
    GradeDistriContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
  ],
  exports: [
    RouterModule,
    GradeDistriContainerComponent
  ],
  providers: []
})
export class GradeDistributionModule { }

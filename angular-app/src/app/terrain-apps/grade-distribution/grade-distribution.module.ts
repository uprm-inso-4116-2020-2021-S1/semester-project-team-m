import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { GradeDistriContainerComponent } from './grade-distri-container/grade-distri-container.component'

@NgModule({
  declarations: [
    GradeDistriContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
    GradeDistriContainerComponent
  ],
  providers: []
})
export class GradeDistributionModule { }

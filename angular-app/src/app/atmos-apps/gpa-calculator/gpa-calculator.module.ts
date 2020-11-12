import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { GpaCalcContainerComponent } from './gpa-calc-container/gpa-calc-container.component';

@NgModule({
  declarations: [
    GpaCalcContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
    GpaCalcContainerComponent
  ],
  providers: []
})
export class GpaCalculatorModule { }

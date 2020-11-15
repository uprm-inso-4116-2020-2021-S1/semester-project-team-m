import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { GpaCalcContainerComponent } from './gpa-calc-container/gpa-calc-container.component';
import { MatTableModule } from '@angular/material/table';
import {
  MatButtonModule,
  MatCardModule,
} from '@angular/material';

@NgModule({
  declarations: [
    GpaCalcContainerComponent
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
    GpaCalcContainerComponent
  ],
  providers: []
})
export class GpaCalculatorModule { }

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
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoutingLayoutModule } from '../../routing-layout.module';

@NgModule({
  declarations: [
    HomeLayoutComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule,
    RoutingLayoutModule,
    MatOptionModule,
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class HomeLayoutModule { }

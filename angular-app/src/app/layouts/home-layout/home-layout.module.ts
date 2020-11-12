import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { HomeLayoutComponent } from './home-layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoutingTerrainModule } from '../../routing-terrain.module';

@NgModule({
  declarations: [
    HomeLayoutComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule,
    RoutingTerrainModule,
    MatOptionModule,
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class HomeLayoutModule { }

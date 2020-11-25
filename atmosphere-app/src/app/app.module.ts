import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingAppModule } from './routing-app.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './atmos-exosphere/auth.component'
import { AtmosTerrainModule } from './atmos-terrain/atmos-terrain.module';
import { CourseCatalogModule } from './terrain-apps/course-catalog/course-catalog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MaterialModule } from './material.module';
import { HomeLayoutModule } from './layouts/home-layout/home-layout.module';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { GradeDistributionModule } from './terrain-apps/grade-distribution/grade-distribution.module';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingAppModule,
    HttpClientModule,
    AtmosTerrainModule,
    CourseCatalogModule,
    GradeDistributionModule,
    HomeLayoutModule,
    SharedModule,
    FlexLayoutModule,
    CdkTableModule,
    MatIconModule,
    ToastrModule.forRoot()
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
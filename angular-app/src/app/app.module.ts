import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingAppModule } from "./routing-app.module";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component'
import { AtmosModule } from './atmos-modules/atmos.module';
import { CourseCatalogModule } from './atmos-apps/course-catalog/course-catalog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MaterialModule } from './material.module';
import { HomeLayoutModule } from './layouts/home-layout/home-layout.module';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { CourseCatalogContainerComponent } from './atmos-apps/course-catalog/course-catalog-container/course-catalog-container.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    // CourseCatalogContainerComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingAppModule,
    HttpClientModule,
    AtmosModule,
    CourseCatalogModule,
    HomeLayoutModule,
    SharedModule,
    FlexLayoutModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component'
import { AtmosModule } from './atmos/atmos.module';
import { CoursesModule } from './atmos-apps/courses/courses.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
} from "@angular/material";
import { MaterialModule } from './material.module';
// import { DefaultHomeComponent } from './layouts/default-home/default-home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { DefaultComponent } from './layouts/default/default.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { HomeLayoutModule } from './layouts/home-layout/home-layout.module';
import { SharedModule } from './shared/shared.module';
// import { HeaderComponent } from './shared/comnponents/header/header.component';
// import { SidebarComponent } from './shared/comnponents/sidebar/sidebar.component';
// import { FooterComponent } from './shared/comnponents/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    // HomeLayoutComponent,
    // AtmosAppsComponent,
    // DefaultLayoutComponent,
    // HeaderComponent,
    // SidebarComponent,
    // FooterComponent,
    // HomeLayoutComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AtmosModule,
    CoursesModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    HomeLayoutModule,
    SharedModule
    // FlexLayoutModule,
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
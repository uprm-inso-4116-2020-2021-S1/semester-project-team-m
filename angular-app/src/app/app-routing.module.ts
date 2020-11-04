import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
// import { CoursesContainerComponent } from './atmos-apps/courses/courses-container/courses-container.component';
import { AtmosHomeComponent } from './atmos/atmos-home/atmos-home.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: AtmosHomeComponent },
  // { path: 'courses', component: CoursesContainerComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

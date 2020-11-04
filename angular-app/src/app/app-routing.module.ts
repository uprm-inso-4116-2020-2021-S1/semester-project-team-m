import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppsContainerComponent } from './atmos/apps-container/apps-container.component';
import { AuthComponent } from './auth/auth.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'home', redirectTo: '/home/apps', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeLayoutComponent,
    children: [{
      path: 'apps',
      component: AppsContainerComponent // <- component containing all icons (links) of our atmosphere apps
    }/*{path: OtherPossibleComponent}*/]
  },
  // { path: '', pathMatch: 'full', redirectTo: 'auth' },
  // { path: 'auth', component: AuthComponent },
  // {
  //   path: 'home',
  //   component: HomeLayoutComponent,
  //   children: [{
  //     path: 'apps',
  //     component: AppsContainerComponent // <- component containing all icons (links) of our atmosphere apps
  //   }/*{path: OtherPossibleComponent}*/]
  // },
  // { path: 'courses', component: CoursesContainerComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppsContainerComponent } from './atmos/apps-container/apps-container.component';
import { AuthComponent } from './auth/auth.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'home', redirectTo: '/home/apps', pathMatch: 'full' }, //layouts-routing
  // { path: 'home', component: AppsContainerComponent }, //layouts-routing
  // { path: 'home/curriculum', redirectTo: '/home/curriculum', pathMatch: 'full' }, //layouts-routing
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

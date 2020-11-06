import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesContainerComponent } from '../atmos-apps/courses/courses-container/courses-container.component';
import { AppsContainerComponent } from '../atmos-modules/apps-container/apps-container.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeLayoutComponent,
    children: [{
      path: 'apps',
      component: AppsContainerComponent // <- component containing all icons (links) of our atmosphere apps
    }, {
      path: 'curriculum',
      component: CoursesContainerComponent
    }/*{path: OtherPossibleComponent}*/]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }

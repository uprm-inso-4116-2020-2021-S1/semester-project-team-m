import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseCatalogContainerComponent } from './atmos-apps/course-catalog/course-catalog-container/course-catalog-container.component';
import { AppsContainerComponent } from './atmos-terrain/apps-container/apps-container.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeLayoutComponent,
    children: [{
      path: 'apps',
      component: AppsContainerComponent // <- component containing all icons (links) of our atmosphere apps
    }, {
      path: 'catalog',
      component: CourseCatalogContainerComponent
    },
    // {
    //   path: 'catalog/:id',
    //   component: CourseCatalogContainerComponent
    // }
    /*{path: OtherPossibleComponent}*/]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingTerrainModule { }

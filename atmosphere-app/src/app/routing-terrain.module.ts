import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseCatalogContainerComponent } from './terrain-apps/course-catalog/course-catalog-container/course-catalog-container.component';
import { TerrainContainerComponent } from './atmos-terrain/terrain-container/terrain-container.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { GradeDistriContainerComponent } from './terrain-apps/grade-distribution/grade-distri-container/grade-distri-container.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeLayoutComponent,
    children: [{
      path: 'apps',
      component: TerrainContainerComponent // <- component containing all icons (links) of our atmosphere apps
    }, {
      path: 'catalog',
      component: CourseCatalogContainerComponent
    }, {
      path: 'grade-distribution',
      component: GradeDistriContainerComponent
    }]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingTerrainModule { }

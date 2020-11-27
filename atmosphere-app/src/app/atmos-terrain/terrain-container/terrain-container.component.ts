import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'terrain-container-apps',
  templateUrl: './terrain-container.component.html',
  styleUrls: ['./terrain-container.component.css']
})
export class TerrainContainerComponent implements OnInit {
  public viewCatalogue = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.router.
    const redirectToWhom = this.route.snapshot.paramMap.get('componentToRerouteTo');
    if (redirectToWhom === 'catalog')
      this.router.navigate(['home/catalogue/'])
  }


  hideViewCatalog(whatIPassed) {
    console.log("What I passed from other component", whatIPassed)
    this.viewCatalogue = whatIPassed;
  }

  detectCourseCatalog() {
    this.router.navigate(['home/catalog'])
  }

  detectGradeDistribution() {
    this.router.navigate(['home/grade-distribution'])
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'terrain-container-apps',
  templateUrl: './terrain-container.component.html',
  styleUrls: ['./terrain-container.component.css']
})
export class TerrainContainerComponent implements OnInit {
  public viewCatalog = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  hideViewCatalog(whatIPassed) {
    console.log("What I passed from other component", whatIPassed)
    this.viewCatalog = whatIPassed;
  }

  detectCourseCatalog() {
    this.router.navigate(['home/catalog'])
  }

  detentGpaCalculator() {
    this.router.navigate(['home/gpa-calculator'])
  }

  detectGradeDistribution() {
    this.router.navigate(['home/grade-distribution'])
  }
}

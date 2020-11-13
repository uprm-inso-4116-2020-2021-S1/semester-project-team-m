import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'apps-container-apps',
  templateUrl: './apps-container.component.html',
  styleUrls: ['./apps-container.component.css']
})
export class AppsContainerComponent implements OnInit {
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

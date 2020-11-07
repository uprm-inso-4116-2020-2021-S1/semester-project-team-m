import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'apps-container-apps',
  templateUrl: './apps-container.component.html',
  styleUrls: ['./apps-container.component.css']
})
export class AppsContainerComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  detectApp() {
    this.router.navigate(['home/catalog'])
    console.log("sup")
  }
}

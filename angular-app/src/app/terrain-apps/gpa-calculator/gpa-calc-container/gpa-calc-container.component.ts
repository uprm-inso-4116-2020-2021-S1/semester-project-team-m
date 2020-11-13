import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gpa-calc-container',
  templateUrl: './gpa-calc-container.component.html',
  styleUrls: ['./gpa-calc-container.component.css']
})
export class GpaCalcContainerComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }


  goBack() {
    this.router.navigate(['home/apps'])
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atmos-home',
  templateUrl: './atmos-home.component.html',
  styleUrls: ['./atmos-home.component.css']
})
export class AtmosHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("atmos home")
  }

}

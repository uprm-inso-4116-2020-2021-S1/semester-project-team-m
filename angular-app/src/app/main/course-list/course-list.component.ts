import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  public movies = [];

  constructor(
    // private api: ApiService
  ) { }

  ngOnInit() {
    // this.movies = this.api.getMovies()
  }
}

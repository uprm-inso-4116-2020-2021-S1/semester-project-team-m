import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../business-logic/api/api.service';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  public movies = [];

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.movies = this.api.getMovies()
  }
}

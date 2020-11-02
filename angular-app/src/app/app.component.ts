import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';


  // url: string = 'http://127.0.0.1:8000/api/courses/';
  //
  // constructor(private http: HttpClient) {
  // }
  //
  // public getLocations() {
  //   this.http.get(this.url).toPromise().then((data) => {
  //     console.log(data);
  //   });
  // }
}

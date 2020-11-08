import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-app';

  private mediaSub: Subscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver
  ) { }

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        console.log(change)
        // console.log(change.mqAlial)
      }
    )
  }


  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }

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

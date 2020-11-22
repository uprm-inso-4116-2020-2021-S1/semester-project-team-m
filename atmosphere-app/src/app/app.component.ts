import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // private mediaSub: Subscription;

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.cookieService.get('courses-token')) {
      this.router.navigate(['/home/page'])
    }
  }
}

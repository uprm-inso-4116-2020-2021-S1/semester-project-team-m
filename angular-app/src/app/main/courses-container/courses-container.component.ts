import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-courses-container',
  templateUrl: './courses-container.component.html',
  styleUrls: ['./courses-container.component.css']
})
export class CoursesContainerComponent implements OnInit {

  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    const token = this.cookieService.get('courses-token')
    if (!token) {
      this.router.navigate(['/auth'])
    }
  }

  logout() {
    this.cookieService.delete('courses-token');
    this.router.navigate(['auth']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  logout() {
    this.cookieService.delete('courses-token');
    this.router.navigate(['auth']);
  }
}

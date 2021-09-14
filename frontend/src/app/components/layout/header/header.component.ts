import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authSvc: AuthService,
  ) {
    // this.isLoggedIn = this.authSvc.isLoggedIn();
  }

  ngOnInit(): void {
  }

  get isLoggedIn() {
    return this.authSvc.isLoggedIn();
  }

  logout(): void {
    this.authSvc.logout();
  }

}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private authSvc: AuthService,
  ) {}

  canActivate(): boolean {
    if( !this.authSvc.isLoggedIn() ) {
      this.router.navigate(['/login']);
      return false;

    } else {
      return true;
      
    }
  }
  
}

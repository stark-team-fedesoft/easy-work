import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserI } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.BASE_URL;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  register(user: UserI): Observable<any> {
    return this.http.post<any>(`${ this.api }/user/registerUser`, user);
  }

  login(user: UserI): Observable<any> {
    return this.http.post<any>(`${ this.api }/user/login`, user);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

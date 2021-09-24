import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserI } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = environment.BASE_URL;

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('email') === 'administrador@gmail.com'
      ? true
      : false;
  }

  register(user: UserI): Observable<any> {
    return this.http.post<any>(`${this.api}/user/registerUser`, user);
  }

  login(user: UserI): Observable<any> {
    return this.http.post<any>(`${this.api}/user/login`, user);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setEmail(email: string): void {
    localStorage.setItem('email', email);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }

  getEmailAdmin(email: string) {
    return this.http.get<any>(this.api + '/user/getEmailAdmin/' + email);
  }

  list(): Observable<any> {
    return this.http.get<any>(`${ this.api }/user/listUsers`);
  }

  findUser(_id: string) {
    return this.http.get<any>(this.api + '/user/findUser/' + _id);
  }

  updateUser(user: any) {
    return this.http.put<any>(this.api + '/user/updateUser', user);
  }

  deleteUser(user: any) {
    return this.http.put<any>(this.api + '/user/deleteUser', user);
  }
  
}

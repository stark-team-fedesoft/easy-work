import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WallpaperService {

  private api = environment.BASE_URL;

  constructor( private http: HttpClient ) { }

  list( query: string): Observable<any> {
    return this.http.get<any>(`${ this.api }/wallpapers/list/${ query }`);
  }
}

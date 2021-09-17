import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListI } from '../interfaces/list';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private api = environment.BASE_URL;

  constructor( private http: HttpClient ) { }

  create( list: ListI ): Observable<any> {
    return this.http.post<any>(`${ this.api }/tasks-list/create`, list);
  }

  list( board_id: string ): Observable<any> {
    return this.http.get<any>(`${ this.api }/tasks-list/list/${ board_id }`);
  }

  update( list: ListI ): Observable<any> {
    return this.http.put<any>(`${ this.api }/tasks-list/update`, list);
  }
}

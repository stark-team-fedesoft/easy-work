import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BoardI } from '../interfaces/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private api = environment.BASE_URL;

  constructor( private http: HttpClient ) { }

  create( board: BoardI ): Observable<any> {
    return this.http.post<any>(`${ this.api }/board/create`, board);
  }

  list( workspace_id: string): Observable<any> {
    return this.http.get<any>(`${ this.api }/board/list/${ workspace_id }`);
  }

  getById(board_id: string): Observable<any> {
    return this.http.get<any>(`${ this.api }/board/get/${ board_id }`);
  }

  update( board: BoardI ): Observable<any> {
    return this.http.put<any>(`${ this.api }/board/update`, board);
  }

  delete(board_id: string): Observable<any> {
    return this.http.delete<any>(`${ this.api }/board/delete/${ board_id }`);
  }
}

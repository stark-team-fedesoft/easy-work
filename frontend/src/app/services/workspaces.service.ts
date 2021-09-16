import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WorkspaceI } from '../interfaces/workspace';

@Injectable({
  providedIn: 'root'
})
export class WorkspacesService {

  private api = environment.BASE_URL;

  constructor( private http: HttpClient ) { }

  create( workspace: WorkspaceI ): Observable<any> {
    return this.http.post<any>(`${ this.api }/workspaces/create`, workspace);
  }

  list(): Observable<any> {
    return this.http.get<any>(`${ this.api }/workspaces/list`);
  }
}

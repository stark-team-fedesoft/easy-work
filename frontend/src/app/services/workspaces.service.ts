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

  get( workspace_id: string ): Observable<any> {
    return this.http.get<any>(`${ this.api }/workspaces/get/${ workspace_id }`);
  }

  addUser( payload: any ): Observable<any> {
    return this.http.post<any>(`${ this.api }/workspaces/add-users`, payload);
  }

  listUsers( workspace_id: string ): Observable<any> {
    return this.http.get<any>(`${ this.api }/workspaces/list-users/${ workspace_id }`);
  }

  removeUser( payload: any ): Observable<any> {
    return this.http.post<any>(`${ this.api }/workspaces/remove-users`, payload);
  }
}

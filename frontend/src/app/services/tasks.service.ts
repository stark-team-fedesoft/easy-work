import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskI } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private api = environment.BASE_URL;

  constructor( private http: HttpClient ) { }

  create( task: TaskI ): Observable<any> {
    return this.http.post<any>(`${ this.api }/tasks/create`, task);
  }

  list( list_id: string ): Observable<any> {
    return this.http.get<any>(`${ this.api }/tasks/list/${ list_id }`);
  }

  update(task: TaskI ): Observable<any> {
    return this.http.put<any>(`${ this.api }/tasks/update`, task);
  }

  delete(task_id: string ): Observable<any> {
    return this.http.delete<any>(`${ this.api }/tasks/delete/${ task_id }`);
  }

}

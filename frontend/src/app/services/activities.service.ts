import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private env: string;
  constructor(private _http: HttpClient) { 
    this.env = environment.BASE_URL;
  }
  registerActivity(activity: any) {
    return this._http.post<any>(this.env + '/Activities/registerActivity', activity);
  }
  listActivities(idBoard: string) {
    return this._http.get<any>(this.env + '/Activities/listActivities/'+idBoard);
  }
  
}

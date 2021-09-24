import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = environment.BASE_URL;

  constructor(private _http: HttpClient) {
   }

   getMyInfo() {
    return this._http.get<any>(this.api + '/user/getMyInfo');
  }

  listSpaceWork() {
    return this._http.get<any>(this.api + '/workspaces/list');
  }
}

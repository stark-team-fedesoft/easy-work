import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {
  private env = environment;
  constructor(
    private _http: HttpClient
  ) { }

  getAll(model: string): any {
    return this._http.get(this.env.apiURL + model);
  }

  get(model: string, param: any): any {
    return this._http.get(this.env.apiURL + model + '/' + param);
  }

  update(model: string, data: any): any {
    return this._http.put(this.env.apiURL + model, data);
  }

  delete(model: string, data?: any): any {
    return this._http.delete(this.env.apiURL + model);
  }

  post(model: string, data: any): any {
    return this._http.post(this.env.apiURL + model, data);
  }
}

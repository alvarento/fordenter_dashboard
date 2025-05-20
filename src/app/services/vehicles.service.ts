import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';


const API_BASE_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private readonly _httpClient: HttpClient) { }

  getVehicles<ReponseType>(endpoint: string): Observable<ReponseType> {
    return this._httpClient.get<ReponseType>(`${API_BASE_URL}${endpoint}`);
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IUser, NewUser } from '../interfaces/user.interface';


const API_BASE_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly _httpClient: HttpClient) { }

  getUser<ReponseType>(endpoint: string, identifier: string | null | number): Observable<ReponseType> {
    return this._httpClient.get<ReponseType>(`${API_BASE_URL}${endpoint}/${identifier}`);
  }

  sendUser(user: NewUser): Observable<NewUser> {
    return this._httpClient.post<NewUser>(`${API_BASE_URL}users`, user)
  }

  updateUser(user: IUser): Observable<IUser> {
    return this._httpClient.put<IUser>(`${API_BASE_URL}users/${user.id}`, user);
  }

  getAllUsers() {
    return this._httpClient.get<IUser[]>(`${API_BASE_URL}users`);
  }

  deleteUser(userId: number): Observable<NewUser> {
    return this._httpClient.delete<NewUser>(`${API_BASE_URL}users/${userId}`)
  }



}

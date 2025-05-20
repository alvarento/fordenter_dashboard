import { Injectable, effect, signal, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, take } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { IUserCredential } from '../interfaces/user-credential';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../types/responses.type';
import { StorageService } from './storage.service';

const API_BASE_URL: string = environment.apiUrl;
const EXPIRATION_TIME_MINUTES = 120;

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private _isAuthenticated = signal<boolean>(false);
   private userSignal = signal<IUser | null>(null);
   loginErrorMessage = signal<string>('Serviço indisponível! Tente mais tarde.');
   loginFailed = false;

   constructor(
      private router: Router,
      private readonly _httpClient: HttpClient,
      private storageService: StorageService,
   ) {
      this.autoLoginExists();
   }

   get user() {
      return this.userSignal;
   }

   get isAuthenticated() {
      return this._isAuthenticated;
   }

   get LoggedUser(): IUser | null {
      return this.userSignal()
   }

   set LoggedUser(user: IUser) {
      this.userSignal.set(user);
   }


   loadUserInfos(): IUser | null {
      const storedUser = this.storageService.getItem('user');
      if (storedUser) {
         try {
            const parsedUser: IUser = JSON.parse(storedUser);
            return parsedUser
         } catch (error) {
            return null;
         }
      }

      return null
   }



   authLogin(userCredentials: IUserCredential): Observable<LoginResponse> {
      return this._httpClient.post<LoginResponse>(`${API_BASE_URL}login`, userCredentials);
   }

   login(userCredentials: IUserCredential): Observable<
   { isAuthenticated: boolean, message: string }
   > {
      return this.authLogin(userCredentials).pipe(
         take(1),
         map((response: LoginResponse) => {
            this.LoggedUser = response.user;
            this._isAuthenticated.set(true);
            this.persistLoginData(response.user)
            return { isAuthenticated: true, message: response.message };
         }),
         catchError((error: HttpErrorResponse) => {
            this._isAuthenticated.set(false);

            if (error.status === 400 || error.status === 401) {
               this.loginErrorMessage.set('usuário/email ou senha inválidos.');
            }

            if (error.status === 500) {
               this.loginErrorMessage.set('Não foi possível processar sua solicitação.')
            }

            return of({ isAuthenticated: false, message: this.loginErrorMessage() });
         })
      );
   }


   logout(): void {
      this.storageService.clear();
      this._isAuthenticated.set(false);
      this.router.navigate(['/login']);
   }

   autoLoginExists() {
      const autoLogin = localStorage.getItem('autoLogin');
      const saved = this.storageService.getItem('isAuthenticated');
      const isAuthenticated = saved === 'true';


      if (autoLogin && this.checkSessionExpiration() && isAuthenticated) {
         this._isAuthenticated.set(true);
      }

      if (isAuthenticated) {
         this._isAuthenticated.set(true);
      }
   }
    

   checkSessionExpiration(): boolean {
      const loginTime = this.storageService.getItem('loginTime');
      if (!loginTime) return false;

      const elapsedTime = (Date.now() - parseInt(loginTime)) / 60000;
      if (elapsedTime > EXPIRATION_TIME_MINUTES) {
         this.logout();
         return false;
      }

      return true;
   }

   isLoggedIn(): boolean {
      return this._isAuthenticated();
   }

   updateStoredUser(partial: Partial<IUser>) {
      const user = JSON.parse(this.storageService.getItem('user')!);
      const updated = { ...user, ...partial };
      this.storageService.setItem('user', JSON.stringify(updated));
   }

   persistLoginData(user: IUser) {
      this.storageService.setItem('isAuthenticated', 'true');
      this.storageService.setItem('user', JSON.stringify(user));
      this.storageService.setItem('loginTime', Date.now().toString());
   }
    
    
}

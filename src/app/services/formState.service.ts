import { Injectable, signal } from '@angular/core';
import { IUser } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class FormStateService {

   constructor() {}
   
   formMode = signal<'form' | 'create' | 'edit' | 'loading' | 'success' | 'error' | ''>('');
   message = signal('');
   selectedUser = signal<IUser | null>(null);

   setSelectedUser(user: IUser | null) {
      this.selectedUser.set(user);
   }
}

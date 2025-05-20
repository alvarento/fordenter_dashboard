// storage.service.ts
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _autoLogin = signal<boolean>(false);

  constructor() {
    
    this.setupInitialStorage();
    this.syncStorageType()
  
  }

  setAutoLogin(enabled: boolean) {
    this._autoLogin.set(enabled);
    this.syncStorageType();
  }

  autoLogin = computed(() => this._autoLogin());

  private _storage: Storage = sessionStorage;

  private syncStorageType() {
    this._storage = this._autoLogin() ? localStorage : sessionStorage;
  }

  setupInitialStorage() {
    if (localStorage.getItem('autoLogin') === 'true') {
      this._autoLogin.set(true);
      sessionStorage.clear();
    } else {
      this._autoLogin.set(false);
      localStorage.clear();
    }
  }

  get storage(): Storage {
    return this._storage;
  }

  setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}
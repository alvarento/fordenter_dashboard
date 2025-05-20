import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { ToggleSwitchComponent } from "../../components/toggle-switch/toggle-switch.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgOptimizedImage, ToggleSwitchComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  identifier: string = '';
  password: string = '';
  loginError: boolean = false;
  errorMessage: string = '';
  user: any;
  autoLogin = signal<boolean>(false);

  constructor(
    private authService: AuthService, 
    private router: Router,
    private storageService: StorageService
  ) { }
  showPassword: boolean = false;
  togglePasswordVisibility = () => this.showPassword = !this.showPassword;


  handleAutoLogin(isEnabled: boolean) {
    this.autoLogin.set(isEnabled);
    this.storageService.setAutoLogin(isEnabled);
  }

  onLogin(formLogin: NgForm): void {
    if (formLogin.invalid) {
      this.loginError = true;
      this.errorMessage = 'Insira seu usuário/email e senha!';
      return
    }
    
    this.authService.login({ identifier: this.identifier, password: this.password }).subscribe((response) => {
      const {isAuthenticated, message } = response;


      
      
      
      if (isAuthenticated) {
        
        if (this.autoLogin()) {
          localStorage.setItem('autoLogin', 'true');
        }

        this.router.navigate(['/dashboard']);
      } else {
        this.loginError = true;
        this.errorMessage = message;
      }

    });
  }


}

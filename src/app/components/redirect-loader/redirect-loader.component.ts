import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-redirect-loader',
  templateUrl: './redirect-loader.component.html',
  styleUrls: ['./redirect-loader.component.scss']
})
export class RedirectLoaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      const isLoggedIn = this.authService.isLoggedIn();
      this.router.navigate([isLoggedIn ? '/home' : '/login']);
    }, 300); // simula carregamento
  }
}

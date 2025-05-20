import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { Router } from '@angular/router';
import { DropdownComponent } from "./components/dropdown/dropdown.component";
import { ModalComponent } from "./components/modal/modal.component";
import { HeaderComponent } from "./components/header/header.component";
import { UsersListComponent } from './components/users-list/users-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, ModalComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public router: Router) { }

  // Verifica se a rota atual deve exibir componentes privados
  isPrivateRoutes(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('/home') || currentRoute.includes('/dashboard');
  }
}

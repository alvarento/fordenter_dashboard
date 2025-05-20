import { Component } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { HamburgerMenuComponent } from '../hamburger-menu/hamburger-menu.component';

@Component({
  selector: 'app-header',
  imports: [DropdownComponent, HamburgerMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {}

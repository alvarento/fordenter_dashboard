import { AfterViewInit, Component, ElementRef, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { NgOptimizedImage } from '@angular/common';
import { Dropdown } from 'bootstrap';
import { FormStateService } from '../../services/formState.service';

@Component({
  selector: 'app-dropdown',
  imports: [NgOptimizedImage],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent implements OnInit, AfterViewInit {
  isDropdownOpen: boolean = false;
  isAdmin: boolean = true;
  user = inject(AuthService).user;
  private formStateService = inject(FormStateService)
  public userSignal = signal<any | null>(null)

  constructor(
    private authService: AuthService,
    private modalService: ModalService,
  ) { }

  logout(): void {
    this.authService.logout();
  }

  showUserList() {
    this.modalService.modalMode.set('usersList')
    this.modalService.open()
  }

  showForm() {
    this.modalService.modalMode.set('form');
    this.formStateService.formMode.set('create');
    this.modalService.open()
  }

  ngOnInit(): void {
    if (!this.user()) {
      this.user.set(this.authService.loadUserInfos())
    }
  }

  ngAfterViewInit(): void {
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map((dropdownToggleEl) => new Dropdown(dropdownToggleEl));
  }
}

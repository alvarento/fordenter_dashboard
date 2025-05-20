import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { Modal } from 'bootstrap';
import { FormStateService } from '../../services/formState.service';
import { UsersListComponent } from '../users-list/users-list.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [UserFormComponent, UsersListComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})

export class ModalComponent {
  errorMessage = '';
  sucessMessage = '';
  modalTitle = ''

  modalService = inject(ModalService);


  @ViewChild(UserFormComponent) userFormComponent!: UserFormComponent;
  @ViewChild('modal') modalElement!: ElementRef;

  modal!: Modal;

  constructor(
    public formStateService: FormStateService
  ) { }


  ngAfterViewInit(): void {
    this.modalElement.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.formStateService.formMode.set('form');
      if (this.userFormComponent) {
        this.userFormComponent.resetForm();
      }
    });

    this.modalElement.nativeElement.addEventListener('shown.bs.modal', () => {
      this.modalTitle = this.modalService.modalTitle()
    });
  }





}

import { computed, inject, Injectable, signal, } from '@angular/core';
import { FormStateService } from './formState.service';

declare let bootstrap: any;

@Injectable({ providedIn: 'root' })
export class ModalService {
  public modalMode = signal<'form' |  'usersList'>('form');
  private formState = inject(FormStateService);
  private modalId = 'staticBackdrop';

  formMode = this.formState.formMode();

  constructor() {}

  readonly modalTitle = computed(() => {
    const mode = this.modalMode();
    const formMode = this.formState.formMode();

    if (mode === 'usersList') return 'Lista de Usuários';
    if (mode === 'form') {
      return formMode === 'edit' ? 'Editar Usuário' :
        formMode === 'create' ? 'Novo Usuário' :
          '';
    }
    return '';
  });


  open() {
    const modalElement = document.getElementById(this.modalId);
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.show();
    }
  }

  close() {
    const modalElement = document.getElementById(this.modalId);
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.hide();
    }
  }
  
}
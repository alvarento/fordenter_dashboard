import { Component, inject, signal, effect } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.interface';
import { NgOptimizedImage } from '@angular/common';
import { FormStateService } from '../../services/formState.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-users-list',
  imports: [NgOptimizedImage],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  private userService = inject(UserService);
  private formState = inject(FormStateService);
  private modalService = inject(ModalService);

  users = signal<IUser[] | []>([]);
  selectedUser = signal<IUser | null>(null);

  constructor() {
    effect(() => {
      this.userService.getAllUsers().subscribe((data) => {
        this.users.set(data);
      });
    });
  }

  onDeleteUser(user: IUser) {
    const confirmed = confirm(`Tem certeza que deseja excluir ${user.first_name}?`);
    if (!confirmed) return;


      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          alert('O usuário foi excluído!')
          this.users.update(users => users.filter(u => u.id !== user.id));
        },
        error: (err) => console.log('Erro ao Excluir usuário', err)
      })
    
  }

  onEditUser(user: IUser) {
    this.modalService.modalMode.set('form');
    this.formState.formMode.set('edit')
    this.formState.setSelectedUser(user);
  }

}

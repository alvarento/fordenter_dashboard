import { Component, ElementRef, ViewChild, OnChanges, SimpleChanges, effect, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Modal } from 'bootstrap';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormStateService } from '../../services/formState.service';

import { IUser, NewUser } from '../../interfaces/user.interface';
import { IUserFormValues } from '../../interfaces/user-form-values.interface';



@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnChanges {
  authService = inject(AuthService);
  user!: IUser | null;
  userForm: FormGroup;
  @ViewChild('userModal') modalElement!: ElementRef;

  modal!: Modal;
  
  showPassword: boolean = false;
  togglePasswordVisibility = () => this.showPassword = !this.showPassword;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public formStateService: FormStateService,
  ) {

    this.user = formStateService.selectedUser()

    this.userForm = this.fb.group({
      full_name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      role: [null, Validators.required],
      user_img_src: [null]
    });

    effect(() => {
      if (this.user) {
        this.formStateService.formMode.set('edit')
        this.userForm.patchValue(this.user);
      } else {
        this.formStateService.formMode.set('create')
        this.userForm.reset();
      }
    });
  }




  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {

      this.userForm.patchValue({
        full_name: this.user.full_name,
        email: this.user.email,
        password: '',
        role: this.user.role,
        user_img_src: this.user.user_img_src || ''
      });
    } else if (!this.user && this.userForm) {
      this.userForm.reset();
    }

    this.formStateService.formMode.set('create')
  }

  isInvalid(field: string): boolean | undefined {
    const control = this.userForm.get(field);
    return control?.invalid && (control.dirty || control.touched);
  }

  isValid(field: string): boolean | undefined {
    const control = this.userForm.get(field);
    return control?.valid && (control.dirty || control.touched);
  }

  getError(field: string): string | null {
    const control = this.userForm.get(field);
    if (!control || control.valid) return null;

    const errors = control.errors;

    if (errors) {
      if (errors['required']) return 'Este campo é obrigatório';
      if (errors['email']) return 'Email inválido';
      if (errors['minlength']) return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }


    this.formStateService.formMode.set('loading');

    console.log(this.user?.id)


    if (this.user?.id) {
      const userToUpdate: IUser = { ...this.userForm.value, id: this.user?.id };
      this.userService.updateUser(userToUpdate).subscribe({
        next: () => {
          this.formStateService.formMode.set('success');
          this.formStateService.message.set('Usuário atualizado com sucesso!');
          const { id } = this.authService.LoggedUser!;
          if (id === userToUpdate.id) {
            this.authService.LoggedUser = userToUpdate;
            this.authService.updateStoredUser(userToUpdate);
          }
        },
        error: () => {
          this.formStateService.formMode.set('error');
          this.formStateService.message.set('Erro ao atualizar usuário.');
        }
      });
    } else {

      const { full_name, ...infos } = this.userForm.value as IUserFormValues;
      const newUser: NewUser = {
        first_name: full_name.split(' ')[0],
        full_name,
        ...infos
      }
      this.userService.sendUser(newUser).subscribe({
        next: () => {
          this.formStateService.formMode.set('success');
          this.formStateService.message.set('Usuário criado com sucesso!');
        },
        error: () => {
          this.formStateService.formMode.set('error');
          this.formStateService.message.set('Erro ao criar usuário.');
        }
      });
    }
  }

  resetForm() {
    this.userForm.reset();
  }
}

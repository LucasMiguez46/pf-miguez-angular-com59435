import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { User } from '../../dashboard/users/models';
import { AuthService } from '../../../core/services/auth.service';
import { UsersService } from '../../../core/services/users.service';

interface UserDialogData {
  editingUser?: User;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public userService: UsersService
  ) {
    this.registerForm = this.formBuilder.group({
      primerNombre: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(20), this.soloLetras()]],
      ultimoNombre: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(20), this.soloLetras()]],
      gmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  soloLetras(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const isValid = /^[a-zA-Z]+$/.test(value);
      return isValid ? null : { onlyLetters: true };
    };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;

      // Llamar al servicio para guardar el usuario en db.json
      this.userService.createUser(user).subscribe(response => {
        console.log('Usuario guardado exitosamente:', response);
        alert('Usuario registrado exitosamente');
      }, error => {
        alert('Error al guardar usuario:' + error);
      });
    }
  }
}

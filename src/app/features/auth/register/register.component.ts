import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  passwordInputType: 'password' | 'text' = 'password';
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

      this.userService.createUser(user).subscribe({
        next: (response) => {
          alert('Usuario registrado exitosamente' + response.id);
        },
        error: (error) => {
          alert('Error al guardar usuario:' + error);
        }
      });
    }
  }

  togglePasswordInputType(): void {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
  }
}

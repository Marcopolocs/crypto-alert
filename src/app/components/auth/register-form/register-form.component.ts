import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { RegistrationForm } from 'src/app/shared/registration-form.interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  isLoading: boolean = false;
  error: string | null = null;

  registrationForm: FormGroup<RegistrationForm> = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmedPassword: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.registrationForm.valid) {
      return;
    }
    const email = this.registrationForm.controls.email.value;
    const password = this.registrationForm.controls.password.value;

    if (
      this.registrationForm.controls.password.value ===
      this.registrationForm.controls.confirmedPassword.value
    ) {
      this.isLoading = true;
      this.authService.signUp(email, password).subscribe(
        (responseData) => {
          this.isLoading = false;
          this.router.navigate(['login']);
        },
        (errorMessage) => {
          this.isLoading = false;
          this.error = errorMessage;
        }
      );
    } else return;

    this.registrationForm.reset();
  }

  checkWhetherPasswordsMatch(control: FormControl) {
    if (control.value.password !== control.value.confirmedPassword) {
      return { passwordsMatch: false };
    }
    return null;
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }
}

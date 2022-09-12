import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  isLoading: boolean = false;
  error: string | null = null;

  registrationForm = this.fb.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
      },
    ],
    password: [
      '',
      { validators: [Validators.required, Validators.minLength(6)] },
    ],
    confirmedPassword: ['', { validators: [Validators.required] }],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (!this.registrationForm.valid) {
      return;
    }
    const email = this.registrationForm.value.email;
    const password = this.registrationForm.value.password;

    if (
      this.registrationForm.value.password ===
      this.registrationForm.value.confirmedPassword
    ) {
      this.isLoading = true;
      this.authService.signUp(email, password).subscribe(
        (responseData) => {
          console.log(responseData);
          this.isLoading = false;
        },
        (errorMessage) => {
          this.isLoading = false;
          this.error = errorMessage;
          console.log(errorMessage);
        }
      );
    } else return;

    this.registrationForm.reset();
  }

  matchingPasswords(control: FormControl) {
    if (control.value.password !== control.value.confirmedPassword) {
      return { passwordsDontMatch: true };
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

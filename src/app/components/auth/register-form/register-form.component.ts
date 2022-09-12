import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
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
      { validators: [Validators.required, Validators.minLength(8)] },
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
        (error) => {
          this.isLoading = false;
          this.error = 'An error occurred';
          console.log(error);
        }
      );
    } else return;

    this.registrationForm.reset();
  }
}

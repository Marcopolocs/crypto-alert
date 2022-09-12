import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  registrationForm = this.fb.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
      },
    ],
    username: ['', { validators: [Validators.required] }],
    password: [
      '',
      { validators: [Validators.required, Validators.minLength(8)] },
    ],
    confirmedPassword: ['', { validators: [Validators.required] }],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {}
}

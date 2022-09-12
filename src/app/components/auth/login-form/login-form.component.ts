import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from 'src/app/shared/login-form.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginForm = new FormGroup<LoginForm>({
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl<string | null>('', {
      validators: [Validators.required],
    }),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {}
}

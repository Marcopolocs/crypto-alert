import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new UntypedFormControl('', { validators: [Validators.required] }),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {}
}

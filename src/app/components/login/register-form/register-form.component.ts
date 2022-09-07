import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registrationForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      emailAddress: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmedPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.registrationForm);
  }
}

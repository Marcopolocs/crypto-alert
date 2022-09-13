import { FormControl } from '@angular/forms';

export interface RegistrationForm {
  email: FormControl<string>;
  password: FormControl<string>;
  confirmedPassword: FormControl<string>;
}

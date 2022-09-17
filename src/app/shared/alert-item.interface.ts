import { FormControl } from '@angular/forms';

export interface AlertForm {
  cryptoName: FormControl<string>;
  price: FormControl<number>;
  isGreater: FormControl<boolean>;
}

export interface AlertItem {
  cryptoName: string;
  price: number;
  isGreater: boolean;
  id?: string;
}

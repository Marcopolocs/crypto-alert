import { FormControl } from '@angular/forms';

export interface AlertItem {
  cryptoName: FormControl<string>;
  price: FormControl<number>;
  isGreater: FormControl<boolean>;
}

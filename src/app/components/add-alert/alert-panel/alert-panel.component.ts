import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AlertForm, AlertItem } from 'src/app/shared/alert-item.interface';
import { CryptoItem } from 'src/app/shared/crypto-item.interface';

@Component({
  selector: 'app-alert-panel',
  templateUrl: './alert-panel.component.html',
  styleUrls: ['./alert-panel.component.css'],
})
export class AlertPanelComponent implements OnInit {
  cryptoNames: string[] = [];
  @Input() cryptoItems$!: Observable<CryptoItem[]>;
  @Input() singleCryptoItem!: CryptoItem | null;
  @Output() alertObject = new EventEmitter<AlertItem>();

  newAlertForm: FormGroup<AlertForm> = this.fb.nonNullable.group({
    cryptoName: ['', [Validators.required]],
    price: [0, [Validators.required]],
    isGreater: [true, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.cryptoItems.forEach((cryptopItem) => {
    //   this.cryptoNames.push(cryptopItem.symbol);
    // });
    this.cryptoItems$.subscribe();
    setTimeout(() => console.log(this.cryptoItems$), 3000);

    this.setDefaultCryptoNameValue();
  }

  setDefaultCryptoNameValue() {
    if (this.singleCryptoItem !== null) {
      this.newAlertForm
        .get('cryptoName')
        ?.patchValue(this.singleCryptoItem.symbol);
      this.newAlertForm.get('price')?.patchValue(this.singleCryptoItem.price);
    } else {
      this.newAlertForm.get('cryptoName')?.patchValue('BTC');
    }
  }

  onCreateAlert() {
    this.alertObject.emit({
      cryptoName: this.newAlertForm.controls.cryptoName.value,
      price: this.newAlertForm.controls.price.value,
      isGreater: this.newAlertForm.controls.isGreater.value,
    });
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertForm, AlertItem } from 'src/app/shared/alert-item.interface';
import { CryptoItem } from 'src/app/shared/crypto-item.interface';

@Component({
  selector: 'app-alert-panel',
  templateUrl: './alert-panel.component.html',
  styleUrls: ['./alert-panel.component.css'],
})
export class AlertPanelComponent implements OnInit {
  cryptoNames: string[] = [];
  @Input() cryptoItems!: CryptoItem[];
  @Output() alertObject = new EventEmitter<AlertItem>();

  newAlertForm: FormGroup<AlertForm> = this.fb.nonNullable.group({
    cryptoName: ['', [Validators.required]],
    price: [0, [Validators.required]],
    isGreater: [true, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cryptoItems.forEach((cryptopItem) => {
      this.cryptoNames.push(cryptopItem.symbol);
    });

    this.setDefaultCryptoNameValue();
  }

  setDefaultCryptoNameValue() {
    this.newAlertForm.get('cryptoName')?.patchValue('BTC');
  }

  onCreateAlert() {
    // const cryptoName = this.newAlertForm.controls.cryptoName.value;
    // const price = this.newAlertForm.controls.price.value;
    // const isGreater = this.newAlertForm.controls.isGreater.value;
    this.alertObject.emit({
      cryptoName: this.newAlertForm.controls.cryptoName.value,
      price: this.newAlertForm.controls.price.value,
      isGreater: this.newAlertForm.controls.isGreater.value,
    });
  }
}

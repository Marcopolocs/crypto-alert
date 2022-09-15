import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertItem } from 'src/app/shared/alert-item.interface';
import { CryptoItem } from 'src/app/shared/crypto-item.interface';

@Component({
  selector: 'app-alert-panel',
  templateUrl: './alert-panel.component.html',
  styleUrls: ['./alert-panel.component.css'],
})
export class AlertPanelComponent implements OnInit {
  cryptoNames: string[] = [];
  @Input() cryptoItems!: CryptoItem[];

  newAlertForm: FormGroup<AlertItem> = this.fb.nonNullable.group({
    cryptoName: ['', [Validators.required]],
    price: [0, [Validators.required]],
    isGreater: [true, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cryptoItems.forEach((cryptopItem) => {
      this.cryptoNames.push(cryptopItem.symbol);
    });

    this.setDefaults();
  }

  setDefaults() {
    this.newAlertForm.get('cryptoName')?.patchValue('BTC');
  }

  onCreateAlert() {
    console.log(this.newAlertForm.controls.price.value);
    console.log(this.newAlertForm.controls.isGreater.value);
    console.log(this.newAlertForm.controls.cryptoName.value);
  }
}

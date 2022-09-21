import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';
import { AlertForm, AlertItem } from 'src/app/shared/alert-item.interface';
import { AlertPanelEnum } from 'src/app/shared/alert.enum';
import { CryptoItem } from 'src/app/shared/crypto-item.interface';

@Component({
  selector: 'app-alert-panel',
  templateUrl: './alert-panel.component.html',
  styleUrls: ['./alert-panel.component.css'],
})
export class AlertPanelComponent implements OnInit {
  isAlertMode: Observable<AlertPanelEnum> = this.alertsService.alertPanelType$;
  editedCryptoItemObject!: AlertItem;

  @Input() cryptoItems$!: Observable<CryptoItem[]>;
  @Input() singleCryptoItem!: CryptoItem | null;
  @Output() alertObject = new EventEmitter<AlertItem>();

  newAlertForm: FormGroup<AlertForm> = this.fb.nonNullable.group({
    cryptoName: ['', [Validators.required]],
    price: [0, [Validators.required]],
    isGreater: [true, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private alertsService: AlertsService) {}

  ngOnInit(): void {
    // THIS IF STATEMENT WAS NEEDED OTHERWISE THE LOGIC HERE WOULD RUN IN CASE OF EDITMODE AND RESULT IN ERROR
    if (this.alertsService.alertPanelType$.getValue() !== AlertPanelEnum.EDIT) {
      this.setDefaultCryptoNameValue();
      this.alertsService.alertPanelType$.next(AlertPanelEnum.CREATE);
    } else {
      this.editedCryptoItemObject = this.alertsService.setEditedCryptoItem;
      this.setEditedCryptoItemValuesAsDefault();
    }
  }

  setDefaultCryptoNameValue(): void {
    if (this.singleCryptoItem !== null) {
      this.newAlertForm
        .get('cryptoName')
        ?.patchValue(this.singleCryptoItem.symbol);
      this.newAlertForm.get('price')?.patchValue(this.singleCryptoItem.price);
    } else {
      this.newAlertForm.get('cryptoName')?.patchValue('BTC');
    }
  }

  setEditedCryptoItemValuesAsDefault() {
    this.newAlertForm
      .get('cryptoName')
      ?.patchValue(this.editedCryptoItemObject.cryptoName);
    this.newAlertForm
      .get('price')
      ?.patchValue(this.editedCryptoItemObject.price);
  }

  onCreateAlert(): void {
    this.alertObject.emit({
      cryptoName: this.newAlertForm.controls.cryptoName.value,
      price: this.newAlertForm.controls.price.value,
      isGreater: this.newAlertForm.controls.isGreater.value,
      id: Math.random().toString(),
    });
  }

  onEditAlert(): void {
    this.alertObject.emit({
      cryptoName: this.newAlertForm.controls.cryptoName.value,
      price: this.newAlertForm.controls.price.value,
      isGreater: this.newAlertForm.controls.isGreater.value,
    });
  }
}

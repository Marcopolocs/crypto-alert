import { Component, Input, OnInit } from '@angular/core';
import { CryptoItem } from 'src/app/shared/crypto-item.interface';

@Component({
  selector: 'app-alert-panel',
  templateUrl: './alert-panel.component.html',
  styleUrls: ['./alert-panel.component.css'],
})
export class AlertPanelComponent implements OnInit {
  @Input() cryptoItems!: CryptoItem[];
  constructor() {}

  ngOnInit(): void {}
}

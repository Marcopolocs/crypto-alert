import { Component, Input, OnInit } from '@angular/core';
import { CryptoItem } from 'src/app/shared/crypto-item.interface';

@Component({
  selector: 'app-crypto-item',
  templateUrl: './crypto-item.component.html',
  styleUrls: ['./crypto-item.component.css'],
})
export class CryptoItemComponent implements OnInit {
  @Input() cryptoItem!: CryptoItem;
  @Input() index!: number;
  @Input() even!: boolean;

  constructor() {}

  ngOnInit(): void {}
}

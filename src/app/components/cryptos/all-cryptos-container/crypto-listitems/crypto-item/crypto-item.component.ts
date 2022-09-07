import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-crypto-item',
  templateUrl: './crypto-item.component.html',
  styleUrls: ['./crypto-item.component.css'],
})
export class CryptoItemComponent implements OnInit {
  @Input() cryptoItem: any;
  @Input() index: any;
  @Input() even: any;

  constructor() {}

  ngOnInit(): void {}
}

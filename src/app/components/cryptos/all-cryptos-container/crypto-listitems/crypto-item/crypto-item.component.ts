import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  @Output() sendCryptoItemIntoAddAlert = new EventEmitter<CryptoItem>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToAddAlert(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.router.navigate(['add-alert']);
    this.sendCryptoItemIntoAddAlert.emit(this.cryptoItem);
  }
}

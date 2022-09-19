import { Component, Input, OnInit } from '@angular/core';
import { AlertItem } from 'src/app/shared/alert-item.interface';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.css'],
})
export class AlertPopupComponent implements OnInit {
  @Input() alertItem!: AlertItem;
  constructor() {}

  ngOnInit(): void {}
}

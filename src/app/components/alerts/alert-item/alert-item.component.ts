import { Component, Input, OnInit } from '@angular/core';
import { AlertItem } from 'src/app/shared/alert-item.interface';

@Component({
  selector: 'app-alert-item',
  templateUrl: './alert-item.component.html',
  styleUrls: ['./alert-item.component.css'],
})
export class AlertItemComponent implements OnInit {
  @Input() alertObjects!: AlertItem[];
  constructor() {}

  ngOnInit(): void {}
}

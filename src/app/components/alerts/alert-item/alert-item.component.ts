import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertItem } from 'src/app/shared/alert-item.interface';

@Component({
  selector: 'app-alert-item',
  templateUrl: './alert-item.component.html',
  styleUrls: ['./alert-item.component.css'],
})
export class AlertItemComponent implements OnInit {
  @Input() alertObjects!: AlertItem[];
  @Output() deletedAlertObject = new EventEmitter<AlertItem>();
  constructor() {}

  ngOnInit(): void {}

  onDeleteAlertItem(item: AlertItem): void {
    this.deletedAlertObject.emit(item);
  }
}

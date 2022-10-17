import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { AlertItem } from 'src/app/shared/alert-item.interface';
import { AlertPanelEnum } from 'src/app/shared/alert.enum';

@Component({
  selector: 'app-alert-item',
  templateUrl: './alert-item.component.html',
  styleUrls: ['./alert-item.component.css'],
})
export class AlertItemComponent implements OnInit {
  isEditMode: boolean = false;

  @Input() alertObjects!: AlertItem[];
  @Output() deletedAlertObject = new EventEmitter<AlertItem>();
  @Output() editedAlertObject = new EventEmitter<AlertItem>();

  constructor(private alertsService: AlertsService) {}

  @HostListener('window:keyup.escape', ['$event']) escapeEvent(
    event: KeyboardEvent
  ) {
    if (this.isEditMode) {
      this.isEditMode = false;
    }
  }

  ngOnInit(): void {}

  setEditModeAndAlertItem(item: AlertItem) {
    this.alertsService.alertPanelType$.next(AlertPanelEnum.EDIT);
    this.alertsService.settingEditedCryptoItem(item);
    this.isEditMode = true;
  }

  editingAlertObject(item: AlertItem) {
    this.editedAlertObject.emit(item);
    this.isEditMode = false;
    this.alertsService.alertPanelType$.next(AlertPanelEnum.CREATE);
  }

  onDeleteAlertItem(item: AlertItem): void {
    this.deletedAlertObject.emit(item);
  }

  hideAlertPanel(value: boolean) {
    this.isEditMode = value;
    this.alertsService.alertPanelType$.next(AlertPanelEnum.CREATE);
  }
}

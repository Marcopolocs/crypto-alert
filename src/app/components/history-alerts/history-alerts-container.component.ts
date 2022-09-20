import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-alerts-container',
  templateUrl: './history-alerts-container.component.html',
  styleUrls: ['./history-alerts-container.component.css'],
})
export class HistoryAlertsContainerComponent implements OnInit {
  testObject: any = {
    firstName: 'Mark',
    lastName: 'Meszaros',
    birthDate: 1992,
    fullKok: 'no',
  };

  constructor() {}

  ngOnInit(): void {
    console.log(Object.entries(this.testObject));
  }
}

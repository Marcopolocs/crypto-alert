import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: ` <section class="spinner-container">
    <div class="lds-default">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </section>`,
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

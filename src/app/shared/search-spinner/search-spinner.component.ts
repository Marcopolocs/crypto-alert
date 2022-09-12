import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-spinner',
  template: `<div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div> `,
  styleUrls: ['./search-spinner.component.css'],
})
export class SearchSpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

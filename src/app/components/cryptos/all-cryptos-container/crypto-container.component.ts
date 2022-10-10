import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crypto-container',
  templateUrl: './crypto-container.component.html',
})
export class CryptoContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.test();
  }

  test() {
    const array = [0, 1, 2, 3, 4, 5];
    const newArray = array.reduce((acc, cur) => acc + cur, 0);
    console.log(array);
    console.log(newArray);
  }
}

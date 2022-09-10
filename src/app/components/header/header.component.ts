import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  switchMap,
  catchError,
  distinctUntilChanged,
  filter,
  tap,
  map,
  debounceTime,
} from 'rxjs/operators';
import { CryptoListStateService } from 'src/app/services/crypto-list-state.service';
import { CryptoItem } from 'src/app/shared/crypto-item.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isActiveState: boolean = true;
  imageSrc: string = 'assets/bitcoin-logo.png';
  searchInput: FormControl = new FormControl(null);
  cryptoName!: string;

  searchTerms$: Observable<string> = this.searchInput.valueChanges.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((input) => input !== '' && input !== null)
  );

  searchResults$: Observable<CryptoItem[]> = this.searchTerms$.pipe(
    switchMap((data) =>
      this.cryptoListStateService.storedCryptoItems.pipe(
        map((cryptoList) => {
          return cryptoList.filter((cryptoItem) =>
            cryptoItem.slug.startsWith(data)
          );
        })
      )
    )
  );
  // catchError((e) => [{ data: undefined, error: 'Cannot find crypto' }]))

  constructor(
    private cryptoListStateService: CryptoListStateService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  setIsActiveStateToTrue() {
    this.isActiveState = true;
  }

  setCryptoName(clickedCrypto: string) {
    this.cryptoName = clickedCrypto;
    this.router.navigate(['/all-cryptos/details', this.cryptoName]);
    this.isActiveState = !this.isActiveState;
    this.searchInput.reset();
  }
}

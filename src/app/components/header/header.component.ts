import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isActiveState: boolean = true;
  imageSrc: string = 'assets/bitcoin-logo.png';
  searchInput: FormControl = new FormControl(null);

  searchTerms$: Observable<string> = this.searchInput.valueChanges.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((input) => input !== '' && input !== null),
    map((data) => data.toUpperCase())
  );

  searchResults$: Observable<string[]> = this.searchTerms$.pipe(
    switchMap((data) =>
      this.cryptoLocalService.storedCryptoNames.pipe(
        map((cryptoList) => {
          return cryptoList.filter((cryptoItem) => cryptoItem.startsWith(data));
        }),
        tap((data) => console.log(data))
      )
    )
  );
  // catchError((e) => [{ data: undefined, error: 'Cannot find crypto' }]))

  constructor(private cryptoLocalService: CryptoListStateService) {}

  ngOnInit(): void {}

  setIsActiveStateToTrue() {
    this.isActiveState = true;
  }

  hideSearchSectionAfterClick() {
    this.isActiveState = !this.isActiveState;
    this.searchInput.reset();
  }
}

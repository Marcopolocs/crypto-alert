import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  switchMap,
  catchError,
  distinctUntilChanged,
  filter,
  tap,
  map,
  debounceTime,
} from 'rxjs/operators';
import { CryptoLocalService } from 'src/app/services/crypto-local.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  imageSrc: string = 'assets/bitcoin-logo.png';
  searchInput: FormControl = new FormControl('');

  searchTerms$ = this.searchInput.valueChanges.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((input) => input !== ''),
    map((data) => data.toUpperCase())
  );

  searchResults$ = this.searchTerms$.pipe(
    switchMap((data) =>
      this.cryptoLocalService.storedCryptoNames.pipe(
        map((cryptoList) =>
          cryptoList.filter((cryptoItem) => cryptoItem.startsWith(data))
        ),
        tap((data) => console.log(data))
      )
    )
  );
  // catchError((e) => [{ data: undefined, error: 'Cannot find crypto' }]))

  constructor(private cryptoLocalService: CryptoLocalService) {}

  ngOnInit(): void {}
}

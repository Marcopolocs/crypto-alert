import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  switchMap,
  catchError,
  distinctUntilChanged,
  filter,
  map,
  debounceTime,
} from 'rxjs/operators';
import { CryptoItemsService } from 'src/app/services/crypto-items.service';
import { CryptoItem } from 'src/app/shared/crypto-item.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isSearcResulthWindowOpen: boolean = false;
  imageSrc: string = 'assets/bitcoin-logo.png';
  searchInput: FormControl = new FormControl(null);
  cryptoName!: string;
  @ViewChild('searchInputElement', {
    static: true,
  })
  searchInputElement!: ElementRef;
  @HostListener('window:click', ['$event']) clickEvent(event: any) {
    if (event.target !== this.searchInputElement.nativeElement) {
      this.isSearcResulthWindowOpen = false;
      this.searchInput.reset();
    }
  }
  searchTerms$: Observable<string> = this.searchInput.valueChanges.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((input) => input !== '' && input !== null),
    map((result) => {
      this.isSearcResulthWindowOpen = true;
      return result;
    })
  );

  searchResults$: Observable<CryptoItem[]> = this.searchTerms$.pipe(
    switchMap((data) =>
      this.cryptoItemsService.mergeFetchedAllCryptoObjects().pipe(
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
    private cryptoItemsService: CryptoItemsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  setCryptoName(clickedCrypto: string) {
    this.cryptoName = clickedCrypto;
    this.router.navigate(['/all-cryptos/details', this.cryptoName]);
  }
}

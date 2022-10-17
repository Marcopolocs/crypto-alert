import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  switchMap,
  distinctUntilChanged,
  filter,
  map,
  tap,
  debounceTime,
} from 'rxjs/operators';
import { CryptoItemsService } from 'src/app/services/crypto-items.service';
import { CryptoItem } from 'src/app/shared/crypto-item.interface';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  userSubscription!: Subscription;

  isLoading: boolean = false;
  isSearcResulthWindowOpen: boolean = false;

  imageSrc: string = 'assets/shiba-inu-logo.png';
  searchInput: UntypedFormControl = new UntypedFormControl(null);
  cryptoName!: string;

  @ViewChild('searchInputElement')
  searchInputElement!: ElementRef;
  @HostListener('window:click', ['$event']) clickEvent(event: any) {
    if (this.isAuthenticated) {
      if (event.target !== this.searchInputElement.nativeElement) {
        this.isSearcResulthWindowOpen = false;
        this.searchInput.reset();
        this.isLoading = false;
      }
    } else return;
  }

  searchTerms$: Observable<string> = this.searchInput.valueChanges.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((input) => input !== '' && input !== null),
    map((result) => {
      this.isLoading = true;
      this.isSearcResulthWindowOpen = true;
      return result;
    })
  );

  searchResults$: Observable<CryptoItem[]> = this.searchTerms$.pipe(
    switchMap((data) =>
      this.cryptoItemsService.finalCryptoObjects().pipe(
        map((cryptoList) => {
          return cryptoList.filter(
            (cryptoItem) =>
              cryptoItem.slug.startsWith(data) ||
              cryptoItem.symbol.startsWith(data)
          );
        }),
        tap((item) => (this.isLoading = false))
      )
    )
  );

  constructor(
    private cryptoItemsService: CryptoItemsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  setCryptoName(clickedCrypto: string): void {
    this.cryptoName = clickedCrypto;
    this.router.navigate(['/all-cryptos/details', this.cryptoName]);
  }

  preventPageReloadOnEnter(e: Event) {
    e.preventDefault();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}

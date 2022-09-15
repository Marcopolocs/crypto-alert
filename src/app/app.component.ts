import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;
  userSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });

    // this.authService.autoLogin();
  }

  hasRoute(route: string): boolean {
    return this.router.url.includes(route);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}

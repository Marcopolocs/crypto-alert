import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { CryptoListitemsComponent } from './components/cryptos/all-cryptos-container/crypto-listitems/crypto-listitems.component';
import { CryptoItemComponent } from './components/cryptos/all-cryptos-container/crypto-listitems/crypto-item/crypto-item.component';
import { HeaderComponent } from './components/header/header.component';
import { CryptoDetailsComponent } from './components/cryptos/crypto-details/crypto-details.component';
import { CryptoContainerComponent } from './components/cryptos/all-cryptos-container/crypto-container.component';
import { ForumContainerComponent } from './components/forum/forum-container.component';
import { CommentListComponent } from './components/forum/comment-list/comment-list.component';
import { CommentItemComponent } from './components/forum/comment-list/comment-item/comment-item.component';
import { NewCommentComponent } from './components/forum/new-comment/new-comment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddAlertContainerComponent } from './components/add-alert/add-alert-container.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { SearchSpinnerComponent } from './shared/search-spinner/search-spinner.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { AlertPanelComponent } from './components/add-alert/alert-panel/alert-panel.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AlertItemComponent } from './components/alerts/alert-item/alert-item.component';
import { AlertPopupComponent } from './components/add-alert/alert-popup/alert-popup.component';
import { CommonInterceptor } from './shared/common-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CryptoListitemsComponent,
    CryptoItemComponent,
    HeaderComponent,
    CryptoDetailsComponent,
    CryptoContainerComponent,
    ForumContainerComponent,
    CommentListComponent,
    CommentItemComponent,
    NewCommentComponent,
    SearchSpinnerComponent,
    LoginFormComponent,
    RegisterFormComponent,
    LoadingSpinnerComponent,
    AlertPanelComponent,
    AddAlertContainerComponent,
    AlertsComponent,
    AlertItemComponent,
    AlertPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CommonInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

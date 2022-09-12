import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { CryptoListitemsComponent } from './components/cryptos/all-cryptos-container/crypto-listitems/crypto-listitems.component';
import { CryptoItemComponent } from './components/cryptos/all-cryptos-container/crypto-listitems/crypto-item/crypto-item.component';
import { HeaderComponent } from './components/header/header.component';
import { CryptoDetailsComponent } from './components/cryptos/crypto-details/crypto-details.component';
import { CryptoContainerComponent } from './components/cryptos/all-cryptos-container/crypto-container.component';
import { CryptoForumComponent } from './components/crypto-forum/crypto-forum.component';
import { CommentListComponent } from './components/crypto-forum/comment-list/comment-list.component';
import { CommentItemComponent } from './components/crypto-forum/comment-list/comment-item/comment-item.component';
import { NewCommentComponent } from './components/crypto-forum/new-comment/new-comment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddAlertComponent } from './components/add-alert/add-alert.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { SearchSpinnerComponent } from './shared/search-spinner/search-spinner.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CryptoListitemsComponent,
    CryptoItemComponent,
    HeaderComponent,
    CryptoDetailsComponent,
    CryptoContainerComponent,
    CryptoForumComponent,
    CommentListComponent,
    CommentItemComponent,
    NewCommentComponent,
    AddAlertComponent,
    LoadingSpinnerComponent,
    SearchSpinnerComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

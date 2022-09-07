import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { RegisterFormComponent } from './components/login/register-form/register-form.component';
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
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { AuthResponseData } from 'src/app/shared/auth-response-data.interface';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<User | null>();

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-M_UQR7MZzW-hZHp2BZn0QSt_5ZSyS-s',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResp) => {
          let errorMessage =
            'An unknown error occurred! Please try again later!';
          if (!errorResp.error || !errorResp.error.error) {
            return throwError(errorMessage);
          }
          switch (errorResp.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage =
                'This email is already in use. Please use a different email!';
          }
          return throwError(errorMessage);
        }),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-M_UQR7MZzW-hZHp2BZn0QSt_5ZSyS-s',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResp) => {
          let errorMessage =
            'An unknown error occurred! Please try again later!';
          if (!errorResp.error || !errorResp.error.error) {
            return throwError(errorMessage);
          }
          switch (errorResp.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'This email does not exist!';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'Wrong password! Please try again!';
          }
          return throwError(errorMessage);
        }),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}

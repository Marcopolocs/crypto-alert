import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthResponseData } from 'src/app/shared/auth-response-data.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
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
        })
      );
  }
}

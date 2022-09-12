import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface AuthRegistrationResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthRegistrationResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-M_UQR7MZzW-hZHp2BZn0QSt_5ZSyS-s',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResp) => {
          let errorMessage = 'An unknown error occurred!';
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
}

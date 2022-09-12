import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.post<AuthRegistrationResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-M_UQR7MZzW-hZHp2BZn0QSt_5ZSyS-s',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}

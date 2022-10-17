import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ErrorSnackbarService } from '../services/error-snackbar.service';
import { throwError } from 'rxjs';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  constructor(private errorSnackbarService: ErrorSnackbarService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        const errorString =
          'An unknown error occurred. Please try again later!';
        this.errorSnackbarService.showError(errorString);
        return throwError(() => {
          const err = new Error(`An error occurred`);
          return err;
        });
      })
    );
  }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  tokenObservable;
  message: any = 'error message';
  constructor(
    private storage: StorageService,
    public toastController: ToastController,
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (this.storage.getTokenAsObservable()) {
      return this.storage.getTokenAsObservable().pipe(
        mergeMap(token => {
          const clonedReq = this.addToken(request, token);
          return next.handle(clonedReq);
        }),
        catchError((response: HttpErrorResponse) => {
          return throwError(response);
        })
      );
    }
  }
  private addToken(request: HttpRequest<any>, token: any) {
    if (token) {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return clone;
    }
    return request;
  }
}

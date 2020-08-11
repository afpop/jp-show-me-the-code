import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs/index';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('assets')) return next.handle(req);
    const newRequest = req.clone({ headers: req.headers.set('applicationid', environment.TOKEN) });
    return next.handle(newRequest).pipe(catchError(x => this.handleAuthError(x)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      //this.router.navigateByUrl('/login');
      return of(err.message);
    }
    return throwError(err);
  }
}

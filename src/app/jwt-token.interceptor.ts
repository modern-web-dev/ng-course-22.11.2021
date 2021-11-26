import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class JwtTokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     const headers = request.headers.set('Authentication','Bearer: 32432423423');
     const newRequest = request.clone({headers});
     return next.handle(newRequest);
  }
}

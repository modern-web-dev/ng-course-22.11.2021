import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

export class SpinnerInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.headers.get('Spinner-Required')==='true'){
      console.log('spinner ON');
      return next.handle(request).pipe(tap((val)=> {
        console.log(val);
        console.log('spinner OFF');}));
    }
    return next.handle(request);
  }
}

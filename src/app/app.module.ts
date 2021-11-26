import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BookModule} from './book/book.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from './shared/shared.module';
import {bookRoutes} from './book/book.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtTokenInterceptor} from "./jwt-token.interceptor";
import {SpinnerInterceptor} from "./spinner.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule.forRoot(),
    BookModule.forRoot(),
    RouterModule.forRoot([
      {path: '', redirectTo: '/books', pathMatch: 'full'},
      bookRoutes
    ])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

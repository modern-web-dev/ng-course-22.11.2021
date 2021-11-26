import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BookModule} from './book/book.module';
import {RouterModule} from '@angular/router';
import {BookOverviewComponent} from './book/components/book-overview/book-overview.component';
import {BookDetailsComponent} from './book/components/book-details/book-details.component';
import {SharedModule} from './shared/shared.module';
import {BookDetailsResolver} from './book/components/book-details/book-details.resolver';
import {bookRoutes} from './book/book.routes';
import {BookService} from "./book/services/book.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    BookModule.forRoot(),
    RouterModule.forRoot([
      {path: '', redirectTo: '/books', pathMatch: 'full'},
      bookRoutes
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

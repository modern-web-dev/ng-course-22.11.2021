import {ModuleWithProviders, NgModule} from '@angular/core';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {BookService} from './services/book.service';
import {SearchComponent} from './components/search/search.component';
import {SharedModule} from '../shared/shared.module';
import {BookDetailsResolver} from './components/book-details/book-details.resolver';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    BookDetailsComponent,
    BookOverviewComponent,
    SearchComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [BookOverviewComponent, SearchComponent]
})
export class BookModule {
  static forRoot(): ModuleWithProviders<BookModule> {
    return {
      ngModule: BookModule,
      providers: [BookService, BookDetailsResolver]
    }
  }
}

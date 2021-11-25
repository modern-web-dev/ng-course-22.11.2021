import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {BookService} from './services/book.service';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    BookDetailsComponent,
    BookOverviewComponent,
    SearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [BookOverviewComponent, SearchComponent]
})
export class BookModule {
  static forRoot(): ModuleWithProviders<BookModule> {
    return {
      ngModule: BookModule,
      providers: [BookService]
    }
  }
}

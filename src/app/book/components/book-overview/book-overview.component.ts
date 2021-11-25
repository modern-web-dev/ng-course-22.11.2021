import {Component, OnDestroy} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Observable, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent implements OnDestroy{
  selectedBook: Book | undefined;
  readonly books$: Observable<Book[]>;
  private readonly unsubscribe = new Subject<void>();

  constructor(private readonly books: BookService) {
    this.books$ = books.valueChanges$;
  }

  selectBook(book: Book) {
    this.selectedBook = book;
  }

  isBookSelected(book: Book) {
    return this.selectedBook === book;
  }

  updateOnBookChange(changedBook: Book) {
    this.books.update(changedBook)
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(newBook => {
        this.selectedBook = newBook;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

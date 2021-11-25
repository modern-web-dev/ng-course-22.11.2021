import {Component} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent {
  selectedBook: Book | undefined;
  books: Book[];

  constructor(books: BookService) {
    this.books = books.getAll();
  }

  selectBook(book: Book) {
    this.selectedBook = book;
  }

  isBookSelected(book: Book) {
    return this.selectedBook === book;
  }

  updateOnBookChange(changedBook: Book) {
    this.books = this.books.map(
      book => book.id === changedBook.id ? changedBook : book);
    this.selectedBook = changedBook;
  }
}

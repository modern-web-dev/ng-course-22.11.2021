import {Component} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent {
  selectedBook: Book | undefined;
  books: Book[];

  constructor() {
    this.books = [
      {
        id: 0,
        author: 'Marek Matczak',
        title: 'Angular for nerds'
      },
      {
        id: 1,
        author: 'Douglas Crockford',
        title: 'JavaScript. The Good Parts',
      },
      {
        id: 2,
        author: 'John Example',
        title: 'A story on TypeScript',
      }
    ];
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

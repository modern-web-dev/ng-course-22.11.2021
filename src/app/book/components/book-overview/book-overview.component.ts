import {Component} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent {
  selectedBook: Book | undefined;
  readonly books: Book[];

  constructor() {
    this.books = [
      {
        author: 'Marek Matczak',
        title: 'Angular for nerds'
      },
      {
        author: 'Douglas Crockford',
        title: 'JavaScript. The Good Parts',
      },
      {
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
}

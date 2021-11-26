import {Book} from '../model/book';
import {BehaviorSubject, Observable} from 'rxjs';

export class BookService {
  private idSeq = 0;

  private booksSubject = new BehaviorSubject<Book[]>([
    {
      id: this.idSeq++,
      author: 'Marek Matczak',
      title: 'Angular for nerds'
    },
    {
      id: this.idSeq++,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts',
    },
    {
      id: this.idSeq++,
      author: 'John Example',
      title: 'A story on TypeScript',
    }
  ]);
  public readonly valueChanges$ = this.booksSubject.asObservable();

  getAll(): Observable<Book[]> {
    return this.valueChanges$;
  }

  getOne(bookId: number): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const foundBook = this.booksSubject.value.find(currentBook => currentBook.id === bookId);
      if (foundBook) {
        subscriber.next(foundBook);
        subscriber.complete();
      } else {
        subscriber.error(`Book with ID ${bookId} could not be found`);
      }
    });
  }

  update(bookToUpdate: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const bookCopy = {...bookToUpdate};
      const newBooks = this.booksSubject.value.map(
        book => book.id === bookToUpdate.id ? bookCopy : book);
      subscriber.next(bookCopy);
      subscriber.complete();
      this.booksSubject.next(newBooks);
    });
  }

  save(bookToSave: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const bookCopy = {...bookToSave, id: this.idSeq++};
      const newBooks = [...this.booksSubject.value, bookCopy];
      subscriber.next(bookCopy);
      subscriber.complete();
      this.booksSubject.next(newBooks);
    });
  }
}

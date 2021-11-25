import {Book} from '../model/book';
import {BehaviorSubject, Observable} from 'rxjs';

export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>([
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
  ]);
  public readonly valueChanges$ = this.booksSubject.asObservable();

  getAll(): Observable<Book[]> {
    return this.valueChanges$;
  }

  update(changedBook: Book): Observable<Book>  {
    return new Observable<Book>(subscriber => {
      const bookCopy = {...changedBook};
      const newBooks = this.booksSubject.value.map(
        book => book.id === changedBook.id ? bookCopy : book);
      subscriber.next(bookCopy);
      subscriber.complete();
      this.booksSubject.next(newBooks);
    });
  }
}

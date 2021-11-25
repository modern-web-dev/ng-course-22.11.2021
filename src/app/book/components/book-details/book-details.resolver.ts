import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Book} from '../../model/book';
import {Observable, throwError} from 'rxjs';
import {BookService} from '../../services/book.service';
import {Injectable} from '@angular/core';

@Injectable()
export class BookDetailsResolver implements Resolve<Book> {
  constructor(private readonly books: BookService,
              private readonly router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const bookIdAsString = route.paramMap.get('bookId');
    if (bookIdAsString) {
      const bookId = +bookIdAsString;
      if (!isNaN(bookId)) {
        return this.books.getOne(bookId);
      }
    }
    setTimeout(() => this.router.navigateByUrl('/books/new'));
    return throwError(new Error('Book could not be found'));
  }
}

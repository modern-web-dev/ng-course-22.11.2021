import {Component} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent {
  readonly books$: Observable<Book[]>;

  constructor(private readonly books: BookService,
              private readonly currentRoute: ActivatedRoute,
              private readonly router: Router) {
    this.books$ = books.valueChanges$;
  }

  goToBookDetails(book: Book): Promise<boolean> {
    return this.router.navigate(['.', book.id], {relativeTo: this.currentRoute});
  }
}

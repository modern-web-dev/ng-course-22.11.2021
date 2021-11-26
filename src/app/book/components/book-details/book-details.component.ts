import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Book} from '../../model/book';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnDestroy {
  book: Book

  private readonly unsubscribe = new Subject<void>();

  constructor(private readonly currentRoute: ActivatedRoute,
              private readonly books: BookService,
              private readonly router: Router) {
    this.book = currentRoute.snapshot.data['book'] || {author: '', title: ''}
  }

  save(event: Event) {
    event.preventDefault();
    const form: HTMLFormElement = event.target as HTMLFormElement;
    const authorElement = form.querySelector<HTMLInputElement>('#author');
    const author = authorElement?.value ?? '';
    const titleElement = form.querySelector<HTMLInputElement>('#title');
    const title = titleElement?.value ?? '';
    const saveOrUpdate = this.book?.id != null ? this.books.update({
      id: this.book?.id, author, title
    }) : this.books.save({author, title});
    saveOrUpdate
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.router.navigate(['..'], {relativeTo: this.currentRoute}));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

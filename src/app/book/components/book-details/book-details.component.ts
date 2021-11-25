import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Book} from '../../model/book';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  book: Book

  constructor(private readonly currentRoute: ActivatedRoute) {
    this.book = currentRoute.snapshot.data['book'] || {author: '', title: ''}
  }

  save(event: Event) {
    event.preventDefault();
    const form: HTMLFormElement = event.target as HTMLFormElement;
    const authorElement = form.querySelector<HTMLInputElement>('#author');
    const titleElement = form.querySelector<HTMLInputElement>('#title');
    const updatedBook: Book = {
      id: this.book?.id,
      author: authorElement?.value ?? '',
      title: titleElement?.value ?? ''
    }
  }
}

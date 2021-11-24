import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  @Input()
  book: Book | undefined

  @Output()
  bookChange = new EventEmitter<Book>();

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
    this.bookChange.emit(updatedBook);
  }
}

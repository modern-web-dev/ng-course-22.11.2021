import {ChangeDetectionStrategy, Component, Injector, OnDestroy} from '@angular/core';
import {Book} from '../../model/book';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Subject, takeUntil} from 'rxjs';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {startsWithA} from "./book-validators";
import {PageWithForms} from "../../../shared/page-with-forms";

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnDestroy, PageWithForms {
  book: Book

  bookFormGroup = this.fb.group({
    'title': [undefined, [Validators.required, Validators.maxLength(30)]],
    'author': this.fb.group({
      firstName: [undefined, [Validators.required, Validators.maxLength(15), startsWithA]],
      lastName: [undefined, [Validators.required, Validators.maxLength(15)]]
    }),
  });
  private readonly unsubscribe = new Subject<void>();

  constructor(private readonly currentRoute: ActivatedRoute,
              private readonly books: BookService,
              private readonly router: Router,
              private readonly fb: FormBuilder,
  ) {
    this.book = currentRoute.snapshot.data['book'] || {author: '', title: ''}
    this.bookFormGroup.patchValue(this.book);
  }

  get titleControl(): FormControl {
    return this.bookFormGroup.get('title') as FormControl;
  }

  get firstNameControl(): FormControl {
    return this.bookFormGroup.get('author.firstName') as FormControl;
  }


  get lastNameControl(): FormControl {
    return this.bookFormGroup.get('author.lastName') as FormControl;
  }

  save(event: Event) {
    event.preventDefault();
    const formValue = this.bookFormGroup.value;
    const saveOrUpdate = this.book?.id != null ? this.books.update({
      id: this.book?.id, ...formValue
    }) : this.books.save(formValue);
    saveOrUpdate
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.router.navigate(['..'], {relativeTo: this.currentRoute}));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  canExit(): boolean {
    return this.bookFormGroup.pristine;
  }
}

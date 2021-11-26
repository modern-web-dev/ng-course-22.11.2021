import {AfterViewInit, Component, ElementRef, InjectionToken, ViewChild} from '@angular/core';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  of,
  OperatorFunction,
  switchMap
} from 'rxjs';
import {FormControl} from "@angular/forms";
import {BookService} from "../../services/book.service";
import {Book} from "../../model/book";

@Component({
  selector: 'ba-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  results$: Observable<Book[]> | undefined;

  formControl = new FormControl();

  constructor(private readonly bookService: BookService) {
  }

  ngAfterViewInit(): void {
    this.results$ = this.formControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => this.bookService.findBooks(value))
      );
  }
}


import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
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

@Component({
  selector: 'ba-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  results$: Observable<string[]> | undefined;

  formControl = new FormControl();

  ngAfterViewInit(): void {
    this.results$ = this.formControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        searchForQueryResults()
      );
  }
}

function searchForQueryResults(): OperatorFunction<string, string[]> {
  return switchMap(query => of([`${query}0`, `${query}1`, `${query}1`]).pipe(delay(2000)));
}

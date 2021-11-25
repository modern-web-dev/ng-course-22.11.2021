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

@Component({
  selector: 'ba-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('searchInput')
  searchInputElement: ElementRef | undefined
  results$: Observable<string[]> | undefined;

  ngAfterViewInit(): void {
    this.results$ = fromEvent<Event>(this.searchInputElement?.nativeElement, 'input')
      .pipe(
        mapFromEventToTargetValue(),
        debounceTime(500),
        distinctUntilChanged(),
        searchForQueryResults()
      );
  }
}

function searchForQueryResults(): OperatorFunction<string, string[]> {
  return switchMap(query => of([`${query}0`, `${query}1`, `${query}1`]).pipe(delay(2000)));
}

function mapFromEventToTargetValue(): OperatorFunction<Event, string> {
  return map(event => {
    const searchInput = event.target as HTMLInputElement
    return searchInput.value;
  })
}

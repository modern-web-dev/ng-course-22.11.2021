import { TestBed } from '@angular/core/testing';

import { CheckSavedDataGuard } from './check-saved-data.guard';

describe('CheckSavedDataGuard', () => {
  let guard: CheckSavedDataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckSavedDataGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

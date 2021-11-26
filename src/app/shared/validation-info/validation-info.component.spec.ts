import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationInfoComponent } from './validation-info.component';

describe('ValidationInfoComponent', () => {
  let component: ValidationInfoComponent;
  let fixture: ComponentFixture<ValidationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

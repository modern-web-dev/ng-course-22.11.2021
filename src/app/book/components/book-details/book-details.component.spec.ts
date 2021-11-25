import {BookDetailsComponent} from './book-details.component';
import {Book} from '../../model/book';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

describe('BookDetailsComponent', function () {
  let testBook: Book;
  let updatedAuthor: string;
  let updatedTitle: string;

  beforeEach(function () {
    testBook = {id: 3, author: 'Test Author', title: 'Test Title'};
    updatedAuthor = 'Updated Author';
    updatedTitle = 'Updated Title';
  });

  describe('(unit tests)', function () {
    it('fires an event on save', function () {
      // 1. given
      const eventStub: any = {
        preventDefault: jasmine.createSpy('preventDefault'),
        target: {
          querySelector(selector: string) {
            return {value: selector === '#author' ? updatedAuthor : updatedTitle}
          }
        }
      };
      const component = new BookDetailsComponent();
      component.book = testBook;
      component.bookChange.subscribe(updatedBook => {
        // 3. then
        expect(eventStub.preventDefault).toHaveBeenCalled();
        expect(updatedBook).not.toBeUndefined();
        expect(updatedBook.id).toBe(testBook.id);
        expect(updatedBook.author).toBe(updatedAuthor);
        expect(updatedBook.title).toBe(updatedTitle);
      })
      // 2. when
      component.save(eventStub);
    });
  });

  describe('(DOM tests)', function () {
    let fixture: ComponentFixture<BookDetailsComponent>;
    let component: BookDetailsComponent;
    let element: HTMLElement;

    beforeEach(waitForAsync(function () {
      TestBed.configureTestingModule({
        declarations: [BookDetailsComponent]
      }).compileComponents();
    }));

    beforeEach(function () {
      fixture = TestBed.createComponent<BookDetailsComponent>(BookDetailsComponent);
      component = fixture.componentInstance
      element = fixture.nativeElement as HTMLElement;
    });

    it('shows book values in inputs when book set', function () {
      // given
      component.book = testBook;
      // when
      fixture.detectChanges();
      // then
      const authorInput = element.querySelector<HTMLInputElement>('#author');
      expect(authorInput).not.toBeNull();
      expect(authorInput?.value).toBe(testBook.author);
      const titleInput = element.querySelector<HTMLInputElement>('#title');
      expect(titleInput).not.toBeNull();
      expect(titleInput?.value).toBe(testBook.title);
    });

    it('fires an event on button click', function () {
      // 1. given
      component.book = testBook;
      fixture.detectChanges();
      component.bookChange.subscribe(updatedBook => {
        // 3. then
        expect(updatedBook).not.toBeUndefined();
        expect(updatedBook.id).toBe(testBook.id);
        expect(updatedBook.author).toBe(updatedAuthor);
        expect(updatedBook.title).toBe(testBook.title);
      });
      // 2. when
      const authorInput = element.querySelector<HTMLInputElement>('#author');
      if (authorInput) {
        authorInput.value = updatedAuthor;
      } else {
        fail('input element not found');
      }
      const button = element.querySelector<HTMLButtonElement>('button');
      button?.click();
    });
  });
});

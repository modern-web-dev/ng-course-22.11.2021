import {TestBed} from '@angular/core/testing';
import {BookService} from "./book.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";


describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });
    service = TestBed.inject(BookService);
  });

  fit('should be call /api/books', (done) => {
// 1. given
    const testingController = TestBed.inject(HttpTestingController);
    const response = [{
      "id": 0,
      "title": "Angular for nerds",
      "author": {
        "firstName": "AMarekkkkk",
        "lastName": "Matczak"
      }
    }];
    const requestedUrl = '/api/books';

    service.getAll().subscribe((resp) => {
      //2. When
      expect(resp.length).toBe(1);
      expect(resp[0].title).toBe(response[0].title);
      done();
    })

    // 3. then
    testingController.expectOne(requestedUrl)
      .flush([{
      "id": 0,
      "title": "Angular for nerds",
      "author": {
        "firstName": "AMarekkkkk",
        "lastName": "Matczak"
      }
    }]);

    testingController.expectNone(requestedUrl+'/1');

  });
});

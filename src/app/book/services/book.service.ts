import {Book} from '../model/book';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";

const BOOKS_API = '/api/books';

@Injectable()
export class BookService {
  constructor(private readonly httpClient: HttpClient) {
  }

  getAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(BOOKS_API);
  }

  findBooks(value: string): Observable<Book[]> {
    const params = new HttpParams({
      fromObject: {
        "author.firstName_like" : value
      }
    })

    return this.httpClient.get<Book[]>(BOOKS_API, {params});
  }

  getOne(bookId: number): Observable<Book> {
    return this.httpClient.get<Book>(`${BOOKS_API}/${bookId}`);
  }

  update(bookToUpdate: Book): Observable<Book> {
    const bookCopy = {...bookToUpdate};
    return this.httpClient.put<Book>(`${BOOKS_API}/${bookToUpdate.id}`, bookCopy);
  }

  save(bookToSave: Book): Observable<Book> {
    const bookCopy = {...bookToSave};
    const headers = new HttpHeaders({'Auth-Required':'true', 'Spinner-Required':'true'})
    return this.httpClient.post<Book>(BOOKS_API, bookCopy,{headers});

  }
}

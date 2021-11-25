import {Book} from '../model/book';

export class BookService {
  private books: Book[] = [
    {
      id: 0,
      author: 'Marek Matczak',
      title: 'Angular for nerds'
    },
    {
      id: 1,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts',
    },
    {
      id: 2,
      author: 'John Example',
      title: 'A story on TypeScript',
    }
  ];

  getAll() {
    return [...this.books];
  }
}

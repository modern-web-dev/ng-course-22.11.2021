export interface Book {
  readonly author: Author;
  readonly title: string;
  readonly id?: number;
}
export interface Author {
  readonly firstName: string;
  readonly lastName: string;
}

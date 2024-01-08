import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Book } from './books.service';
import { BooksComponent } from '../books/books.component';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  fetchBooks(): Observable<Book[]> {
    return this.http
      .get<Book[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .pipe(delay(1500));
  }

  post(newBook: Book): Observable<Book> {
    return this.http.post<Book>('https://jsonplaceholder.typicode.com/todos', {
      newBook,
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
  }

  editBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        book,
      }
    );
  }
}

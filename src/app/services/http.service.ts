import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Book } from './books.service';
import { BooksComponent } from '../books/books.component';
import { User } from './users.service';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  fetchBooks(): Observable<Book[]> {
    return this.http
      .get<Book[]>('http://localhost:8080/books')
      .pipe(delay(1500));
  }

  post(newBook: Book): Observable<Book> {
    return this.http.post<Book>('http://localhost:8080/books', newBook);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/books/${id}`);
  }

  editBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`http://localhost:8080/books/${id}`, book);
  }

  findBookByTitle(searchingFragment: string): Observable<Book[]> {
    return this.http
      .get<Book[]>(`http://localhost:8080/books/title/${searchingFragment}`)
      .pipe(delay(1500));
  }

  findBookByAuthor(searchingFragment: string): Observable<Book[]> {
    return this.http
      .get<Book[]>(`http://localhost:8080/books/author/${searchingFragment}`)
      .pipe(delay(1500));
  }

  findBookByIsAvailable(isAvailable: boolean): Observable<Book[]> {
    return this.http
      .get<Book[]>(`http://localhost:8080/books/isAvailable/${isAvailable}`)
      .pipe(delay(1500));
  }

  fetchUserBooks(userId: number) {
    return this.http
      .get<Book[]>(`http://localhost:8080/users/${userId}/user-books`)
      .pipe(delay(1500));
  }

  findUserById(userId: number): Observable<User> {
    return this.http
      .get<User>(`http://localhost:8080/users/${userId}`)
      .pipe(delay(1500));
  }
}

// http://localhost:8080/books
// https://jsonplaceholder.typicode.com/todos?_limit=5
//https://jsonplaceholder.typicode.com/todos
//https://jsonplaceholder.typicode.com/todos/${id}

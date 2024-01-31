import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Book } from './books.service';
import { User } from './users.service';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  fetchBooks(): Observable<Book[]> {
    return this.http
      .get<Book[]>('http://localhost:8080/books')
      .pipe(delay(1500));
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>('http://localhost:8080/books', newBook);
  }

  deleteBook(id: number): Observable<void> {
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

  findUserByName(searchingFragment: string): Observable<User[]> {
    return this.http
      .get<User[]>(`http://localhost:8080/users/name/${searchingFragment}`)
      .pipe(delay(1500));
  }

  findUserBySurname(searchingFragment: string): Observable<User[]> {
    return this.http
      .get<User[]>(`http://localhost:8080/users/surname/${searchingFragment}`)
      .pipe(delay(1500));
  }

  findUserByEmail(searchingFragment: string): Observable<User[]> {
    return this.http
      .get<User[]>(`http://localhost:8080/users/email/${searchingFragment}`)
      .pipe(delay(1500));
  }

  fetchUsers(): Observable<User[]> {
    return this.http
      .get<User[]>('http://localhost:8080/users')
      .pipe(delay(1500));
  }

  addUser(newUser: User): Observable<User> {
    console.log('http', newUser);
    return this.http.post<User>('http://localhost:8080/users', newUser);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/users/${id}`);
  }

  editUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:8080/users/${id}`, user);
  }
}

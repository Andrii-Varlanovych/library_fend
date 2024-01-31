import { Injectable, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from './users.service';

export interface Book {
  user?: User | null;
  id?: number;
  title: string;
  author: string;
  isAvailable: boolean;
}

export interface MyError {
  message: string;
  status?: number;
  timestamp?: string;
}

@Injectable({ providedIn: 'root' })
export class BooksService {
  constructor(private httpService: HttpService, private router: Router) {}

  fetchBooks(): Observable<Book[]> {
    return this.httpService.fetchBooks().pipe(
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  addBook(newBook: Book): Observable<Book> {
    return this.httpService.addBook(newBook).pipe(
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  deleteBook(id: number) {
    this.httpService.deleteBook(id).subscribe(
      () => {},
      (error) => {
        this.router.navigate(['error'], {
          queryParams: {
            message: error.error.message,
            status: error.status,
            timestamp: error.error.timestamp,
          },
        });
      }
    );
  }

  editBook(id: number, book: Book): Observable<Book> {
    return this.httpService.editBook(id, book).pipe(
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  findBookByTitle(searchingFragment: string): Observable<Book[]> {
    return this.httpService.findBookByTitle(searchingFragment).pipe(
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  findBookByAuthor(searchingFragment: string): Observable<Book[]> {
    return this.httpService.findBookByAuthor(searchingFragment).pipe(
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  findBookByIsAvailable(isAvailable: boolean): Observable<Book[]> {
    return this.httpService.findBookByIsAvailable(isAvailable).pipe(
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  fetchUserBooks(userId: number): Observable<Book[]> {
    return this.httpService.fetchUserBooks(userId).pipe(
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  errorHandler(error: HttpErrorResponse) {
    this.router.navigate(['error'], {
      queryParams: {
        message: error.error.message,
        status: error.status,
        timestamp: error.error.timestamp,
      },
    });
    return throwError(error);
  }
}

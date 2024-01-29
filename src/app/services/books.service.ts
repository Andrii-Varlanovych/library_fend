import { Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { BooksComponent } from '../books/books.component';
import { Route, Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
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
  isLoadingBooks: boolean = false;
  isHavingBooks: boolean = false;
  books: Book[] = [];
  // = [
  //   { userId: 11, id: 1, title: 'Book 1', completed: false },
  //   { userId: 22, id: 2, title: 'Book 2', completed: true },
  //   { userId: 33, id: 3, title: 'Book 3', completed: false },
  //   { userId: 44, id: 4, title: 'Book 4', completed: true },
  // ];

  constructor(private httpService: HttpService, private router: Router) {}

  getBookById(id: number): Book | undefined {
    const book = this.books.find((book) => book.id === id);
    if (book) {
      return book;
    } else {
      console.log('Somthing wrong with id');
      throw new Error('Book not found');
    }
  }

  fetchBooks(): Observable<Book[]> {
    return this.httpService.fetchBooks().pipe(
      catchError((error) => {
        this.router.navigate(['error'], {
          queryParams: {
            message: error.error.message,
            status: error.status,
            timestamp: error.error.timestamp,
          },
        });
        throw error;
      })
    );
  }

  addBook(newBook: Book) {
    this.httpService.post(newBook).subscribe(
      (book) => {
        this.books.push(book);
      },
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

  deleteBook(id: number) {
    this.httpService.delete(id).subscribe(
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
        this.router.navigate(['error'], {
          queryParams: {
            message: error.error.message,
            status: error.status,
            timestamp: error.error.timestamp,
          },
        });
        throw error;
      })
    );
  }

  //   subscribe(
  //     (responseBook) => {
  //       let findedInBooks: Book = this.books.find(
  //         (b) => b.id === responseBook.id
  //       ) as Book;
  //       Object.assign(findedInBooks, responseBook);

  //       this.router.navigate(['/books']);
  //     },
  //     (error) => {
  //       this.router.navigate(['error'], {
  //         queryParams: {
  //           message: error.error.message,
  //           status: error.status,
  //           timestamp: error.error.timestamp,
  //         },
  //       });
  //     }
  //   );
  // }

  findBookByTitle(searchingFragment: string): Observable<Book[]> {
    return this.httpService.findBookByTitle(searchingFragment).pipe(
      catchError((error) => {
        this.router.navigate(['error'], {
          queryParams: {
            message: error.error.message,
            status: error.status,
            timestamp: error.error.timestamp,
          },
        });
        throw error;
      })
    );
  }

  findBookByAuthor(searchingFragment: string): Observable<Book[]> {
    return this.httpService.findBookByAuthor(searchingFragment).pipe(
      catchError((error) => {
        this.router.navigate(['error'], {
          queryParams: {
            message: error.error.message,
            status: error.status,
            timestamp: error.error.timestamp,
          },
        });
        throw error;
      })
    );
  }

  findBookByIsAvailable(isAvailable: boolean): Observable<Book[]> {
    return this.httpService.findBookByIsAvailable(isAvailable).pipe(
      catchError((error) => {
        this.router.navigate(['error'], {
          queryParams: {
            message: error.error.message,
            status: error.status,
            timestamp: error.error.timestamp,
          },
        });
        throw error;
      })
    );
  }

  fetchUserBooks(userId: number): Observable<Book[]> {
    return this.httpService.fetchUserBooks(userId).pipe(
      catchError((error) => {
        this.router.navigate(['error'], {
          queryParams: {
            message: error.error.message,
            status: error.status,
            timestamp: error.error.timestamp,
          },
        });
        throw error;
      })
    );
  }
}

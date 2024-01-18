import { Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { BooksComponent } from '../books/books.component';
import { Route, Router } from '@angular/router';

export interface Book {
  userId?: number;
  id?: number;
  title: string;
  completed: boolean;
}

export interface MyError {
  message: string;
  status?: number;
  timestamp?: string;
}

@Injectable({ providedIn: 'root' })
export class BooksService {
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

  fetchBooks() {
    BooksComponent.isLoading = true;

    this.httpService.fetchBooks().subscribe(
      (responce) => {
        this.books = responce as Book[];
        BooksComponent.isLoading = false;
      },
      (error) => {
        console.log(error);
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

  addBook(newBook: Book) {
    // newBook.userId = 0;
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
      () => {
        this.books = this.books.filter((b) => b.id !== id);
        this.router.navigate(['/books']);
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

  editBook(id: number, book: Book) {
    this.httpService.editBook(id, book).subscribe(
      (responseBook) => {
        let findedInBooks: Book = this.books.find(
          (b) => b.id === responseBook.id
        ) as Book;
        Object.assign(findedInBooks, responseBook);

        this.router.navigate(['/books']);
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
}

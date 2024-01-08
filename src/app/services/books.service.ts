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
  err: string;
}

@Injectable({ providedIn: 'root' })
export class BooksService {
  books: Book[];
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
        this.router.navigate(['error'], {
          queryParams: {
            err: error.message,
          },
        });
      }
    );
  }

  addBook(newBook: Book) {
    newBook.userId = 0;
    this.httpService.post(newBook).subscribe(
      (book) => {
        let addedBook: Book = Object.values(book)[0];
        addedBook.id = book.id;
        this.books.push(addedBook);
      },
      (error) => {
        this.router.navigate(['error'], {
          queryParams: {
            err: error.message,
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
            err: error.message,
          },
        });
      }
    );
  }

  editBook(id: number, book: Book) {
    this.httpService.editBook(id, book).subscribe(
      (responseBook) => {
        const putedBook: Book = Object.values(responseBook)[0];
        let findedInBooks: Book = this.books.find(
          (b) => b.id === Object.values(responseBook)[1]
        ) as Book;
        findedInBooks.title = putedBook.title;
        findedInBooks.completed = putedBook.completed;
        this.router.navigate(['/books']);
      },
      (error) => {
        this.router.navigate(['error'], {
          queryParams: {
            err: error.message,
          },
        });
      }
    );
  }
}
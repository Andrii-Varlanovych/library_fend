import { Component, Injectable, OnInit } from '@angular/core';
import { Book, BooksService } from '../services/books.service';
import { HttpClient } from '@angular/common/http';
import { User, UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.component.html',
  styleUrls: ['./user-services.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class UserServicesComponent {
  choosenService: string = 'none';
  searchingFragment: string = ' ';
  isAvailable: boolean;
  isLoadingBooks: boolean = false;
  isHavingBooks: boolean = false;
  userId: number;
  user: User;
  books: Book[] = [];

  constructor(
    private booksService: BooksService,
    private usersServices: UsersService
  ) {}

  enterAsUser() {
    this.usersServices.findUserById(this.userId).subscribe((responce) => {
      this.user = responce;
      this.books = [];
    });
  }

  onServiceChange(event: Event) {
    const selectElement: HTMLSelectElement = <HTMLSelectElement>event.target;
    this.choosenService = selectElement.value;
  }

  isAvalableChange(event: Event) {
    const selectElement: HTMLSelectElement = <HTMLSelectElement>event.target;
    this.isAvailable = JSON.parse(selectElement.value.toLowerCase());
  }

  findBookByTitle() {
    this.isHavingBooks = false;
    this.isLoadingBooks = true;
    this.booksService
      .findBookByTitle(this.searchingFragment)
      .subscribe((responce) => {
        this.books = responce;
        this.isLoadingBooks = false;
        if (this.books.length === 0) {
          this.isHavingBooks = true;
        }
      });
  }

  findBookByAuthor() {
    this.isHavingBooks = false;
    this.isLoadingBooks = true;
    this.booksService
      .findBookByAuthor(this.searchingFragment)
      .subscribe((responce) => {
        this.books = responce;
        this.isLoadingBooks = false;
        if (this.books.length === 0) {
          this.isHavingBooks = true;
        }
      });
  }

  findBookByIsAvailable() {
    this.isHavingBooks = false;
    this.isLoadingBooks = true;
    this.booksService
      .findBookByIsAvailable(this.isAvailable)
      .subscribe((responce) => {
        this.books = responce;
        this.isLoadingBooks = false;
        if (this.books.length === 0) {
          this.isHavingBooks = true;
        }
      });
  }

  showAllBooks() {
    this.isLoadingBooks = true;
    this.booksService.fetchBooks().subscribe((responce) => {
      this.books = responce;
      this.isLoadingBooks = false;
    });
  }

  showUserBooks() {
    this.isLoadingBooks = true;
    if (this.user.id) {
      this.booksService.fetchUserBooks(this.user.id).subscribe((responce) => {
        this.books = responce;
        this.isLoadingBooks = false;
      });
    }
  }

  orderBook(book: Book) {
    if (book.id) {
      book.user = this.user;
      book.isAvailable = false;
      this.booksService.editBook(book.id, book).subscribe((responce) => {
        console.log(responce);
        let foundBook = this.books.find((b) => b.id === book.id) as Book;
        Object.assign(foundBook, responce);
      });
    } else {
      throw new Error("Something wrong with book's ID ");
    }
  }

  returnBook(book: Book) {
    if (book.id) {
      book.user = undefined;
      book.isAvailable = true;
      this.booksService.editBook(book.id, book).subscribe((responce) => {
        console.log(responce);
        let foundBook = this.books.find((b) => b.id === book.id) as Book;
        Object.assign(foundBook, responce);
      });
    } else {
      throw new Error("Something wrong with book's ID ");
    }
  }
}

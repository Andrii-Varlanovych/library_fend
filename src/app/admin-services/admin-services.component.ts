import { Component, Injectable } from '@angular/core';
import { Book, BooksService } from '../services/books.service';
import { User, UsersService } from '../services/users.service';
import { NavigationExtras, Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class AdminServicesComponent {
  choosenService: string = 'none';
  searchingFragment: string = ' ';
  isAvailable: boolean;
  isLoadingBooks: boolean = false;
  isHavingBooks: boolean = false;
  books: Book[];
  users: User[];
  isLoadingUsers: boolean = false;
  isHavingUsers: boolean = false;

  constructor(
    private booksService: BooksService,
    private usersServices: UsersService,
    private router: Router
  ) {}

  onServiceChange(event: Event) {
    const selectElement: HTMLSelectElement = <HTMLSelectElement>event.target;
    this.choosenService = selectElement.value;
    this.books = [];
    this.users = [];
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

  isAvalableChange(event: Event) {
    const selectElement: HTMLSelectElement = <HTMLSelectElement>event.target;
    this.isAvailable = JSON.parse(selectElement.value.toLowerCase());
  }

  showAllBooks() {
    this.isLoadingBooks = true;
    this.booksService.fetchBooks().subscribe((responce) => {
      this.books = responce;
      this.isLoadingBooks = false;
    });
  }

  goToBook(book: Book) {
    const navigationExtras: NavigationExtras = {
      state: {
        book: book,
      },
    };
    this.router.navigate(['/book', book.id], navigationExtras);
  }

  findUserByName() {
    this.isHavingUsers = false;
    this.isLoadingUsers = true;
    this.usersServices
      .findUserByName(this.searchingFragment)
      .subscribe((responce) => {
        this.users = responce;
        this.isLoadingUsers = false;
        if (this.users.length === 0) {
          this.isHavingUsers = true;
        }
      });
  }

  findUserBySurname() {
    this.isHavingUsers = false;
    this.isLoadingUsers = true;
    this.usersServices
      .findUserBySurname(this.searchingFragment)
      .subscribe((responce) => {
        this.users = responce;
        this.isLoadingUsers = false;
        if (this.users.length === 0) {
          this.isHavingUsers = true;
        }
      });
  }

  findUserByEmail() {
    this.isHavingUsers = false;
    this.isLoadingUsers = true;
    this.usersServices
      .findUserByEmail(this.searchingFragment)
      .subscribe((responce) => {
        this.users = responce;
        this.isLoadingUsers = false;
        if (this.users.length === 0) {
          this.isHavingUsers = true;
        }
      });
  }

  showAllUsers() {
    this.isLoadingUsers = true;
    this.usersServices.fetchUsers().subscribe((responce) => {
      this.users = responce;
      this.isLoadingUsers = false;
    });
  }

  goToUser(user: User) {
    const navigationExtras: NavigationExtras = {
      state: {
        user: user,
      },
    };
    this.router.navigate(['/user', user.id], navigationExtras);
  }
}

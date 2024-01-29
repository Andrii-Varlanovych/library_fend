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

  constructor(
    private booksService: BooksService,
    private usersServices: UsersService,
    private router: Router
  ) {}

  onServiceChange(event: Event) {
    const selectElement: HTMLSelectElement = <HTMLSelectElement>event.target;
    this.choosenService = selectElement.value;
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
}

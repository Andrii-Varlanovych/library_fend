import { Component, Injectable, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { HttpClient } from '@angular/common/http';
import { BooksComponent } from '../books/books.component';

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

  constructor(private booksService: BooksService) {}

  onServiceChange(event: Event) {
    const selectElement: HTMLSelectElement = <HTMLSelectElement>event.target;
    this.choosenService = selectElement.value;
  }

  isAvalableChange(event: Event) {
    const selectElement: HTMLSelectElement = <HTMLSelectElement>event.target;
    this.isAvailable = JSON.parse(selectElement.value.toLowerCase());
  }

  findBookByTitle() {
    this.booksService.findBookByTitle(this.searchingFragment);
  }

  findBookByAuthor() {
    this.booksService.findBookByAuthor(this.searchingFragment);
  }

  findBookByIsAvailable() {
    this.booksService.findBookByIsAvailable(this.isAvailable);
  }

  showAllBooks() {
    this.booksService.fetchBooks();
  }

  orderBook(bookId: number | undefined) {
    if (bookId) {
      //TODO
    } else {
      throw new Error("Something wrong with book's ID ");
    }
  }

  get getBookService() {
    return this.booksService;
  }
}

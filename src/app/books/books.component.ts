import { Component, Injectable, OnInit } from '@angular/core';
import { Book, BooksService } from '../services/books.service';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class BooksComponent implements OnInit {
  static isLoading: boolean = false;
  constructor(private booksService: BooksService, private http: HttpClient) {}

  ngOnInit(): void {
    // this.booksService.fetchBooks();
  }

  getIsLoading() {
    return BooksComponent.isLoading;
  }

  get getBookService() {
    return this.booksService;
  }
}

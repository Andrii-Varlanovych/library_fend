import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  NavigationExtras,
  Params,
  Router,
} from '@angular/router';
import { Book, BooksService } from '../services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class BookComponent implements OnInit {
  book: Book;
  isDeleted: boolean;
  constructor(
    private router: Router,
    private rout: ActivatedRoute,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.rout.params.subscribe((params: Params) => {
      if (history.state && history.state.book) {
        this.book = history.state && history.state.book;
      } else {
        throw Error('Something wrong with book');
      }
    });
  }

  deleteBook(id: number | undefined) {
    ////NEED TO UPGRADE. ADD FIELD 'Book was deleted on page'
    if (typeof id === 'number') {
      this.booksService.deleteBook(id);
    } else {
      throw Error('Something wrong with Book ID');
    }
    this.isDeleted = true;
  }

  editBook(book: Book) {
    const navigationExtras: NavigationExtras = {
      state: {
        book: book,
      },
    };
    this.router.navigate(['book', `${this.book.id}`, 'edit'], navigationExtras);
  }
}

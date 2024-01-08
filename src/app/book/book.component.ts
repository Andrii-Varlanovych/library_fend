import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book, BooksService } from '../services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class BookComponent implements OnInit {
  book: Book;
  isShowId: boolean = false;
  constructor(
    private router: Router,
    private rout: ActivatedRoute,
    private booksService: BooksService
  ) {}
  ngOnInit(): void {
    this.rout.params.subscribe((param: Params) => {
      this.book = <Book>this.booksService.getBookById(+param['id']);
    });
    this.rout.queryParams.subscribe((params: Params) => {
      this.isShowId = params['showUserId'];
    });
  }

  hideUserId() {
    this.router.navigate([`/book/${this.book.id}/`, { showUserId: false }]);
  }

  deleteBook(id: number | undefined) {
    if (typeof id === 'number') {
      this.booksService.deleteBook(id);
    } else {
      throw Error('Something wrong with Book ID');
    }
  }

  editBook() {
    this.router.navigate(['book', `${this.book.id}`, 'edit'], {
      queryParams: {
        userId: this.book.userId,
        id: this.book.id,
        title: this.book.title,
        completed: this.book.completed as Boolean,
      },
    });
  }
}

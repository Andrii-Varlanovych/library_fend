import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book, BooksService } from '../services/books.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class EditBookComponent implements OnInit {
  book: Book;
  form: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private booksService: BooksService
  ) {}

  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.book = params as Book;
      this.form = new FormGroup({
        title: new FormControl(`${this.book.title}`, [
          Validators.required,
          Validators.minLength(4),
        ]),
        author: new FormControl(`${this.book.author}`, [
          Validators.required,
          Validators.minLength(3),
        ]),
        isAvailable: new FormControl(`${this.book.isAvailable}`),
      });
    });
  }
  submit() {
    const book = this.form.value;
    const editedBook: Book = {
      title: book.title,
      author: book.author,
      isAvailable: JSON.parse(book.isAvailable),
      id: JSON.parse(String(this.book.id)),
      userId: JSON.parse(String(this.book.userId)),
    };

    if (this.book.id) {
      this.booksService.editBook(this.book.id, editedBook);
    } else {
      throw new Error('Something wrong with id');
    }
  }
}

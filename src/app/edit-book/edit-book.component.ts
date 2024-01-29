import { Component, Injectable, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationExtras,
  Params,
  Router,
} from '@angular/router';
import { Book, BooksService } from '../services/books.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class EditBookComponent implements OnInit {
  book: Book;
  form: FormGroup;
  isEdited: boolean;

  constructor(
    private router: ActivatedRoute,
    private booksService: BooksService
  ) {}

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      if (history.state && history.state.book) {
        this.book = history.state && history.state.book;
      } else {
        throw Error('Something wrong with book');
      }
    });

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
  }

  submit() {
    const book = this.form.value;
    const editedBook: Book = {
      title: book.title,
      author: book.author,
      isAvailable: JSON.parse(book.isAvailable),
      id: JSON.parse(String(this.book.id)),
      user: this.book.user ? this.book.user : null,
    };

    if (this.book.id) {
      this.booksService
        .editBook(this.book.id, editedBook)
        .subscribe((responce) => {
          if (isEqual(responce, editedBook)) {
            this.isEdited = true;
          }
          const navigationExtras: NavigationExtras = {
            state: {
              book: book,
            },
          };
        });
    } else {
      throw new Error('Something wrong with id');
    }
  }
}

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
      //console.log('Comes to form', this.book);
      this.form = new FormGroup({
        title: new FormControl(`${this.book.title}`, [
          Validators.required,
          Validators.minLength(5),
        ]),
        completed: new FormControl(`${this.book.completed}`),
      });
    });
  }
  submit() {
    const book = this.form.value;
    const editedBook: Book = {
      title: book.title,
      completed: JSON.parse(book.completed),
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

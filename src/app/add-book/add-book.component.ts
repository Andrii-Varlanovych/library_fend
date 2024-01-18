import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book, BooksService } from '../services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class AddBookComponent implements OnInit {
  form: FormGroup;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      author: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      completed: new FormControl(false),
    });
  }

  submit() {
    const formData = { ...this.form.value };
    const newBook: Book = {
      title: formData.title,
      author: formData.author,
      completed: JSON.parse(formData.completed),
    };
    this.booksService.addBook(newBook);
  }
}

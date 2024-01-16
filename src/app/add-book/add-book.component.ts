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
      // userId: new FormControl(1),
      //id: new FormControl(12),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      completed: new FormControl(false),
    });
  }

  submit() {
    const formData = { ...this.form.value };
    const newBook: Book = {
      title: formData.title,
      completed: JSON.parse(formData.completed),
    };
    this.booksService.addBook(newBook);
  }
}

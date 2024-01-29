import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book, BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class AddBookComponent implements OnInit {
  form: FormGroup;

  constructor(private booksService: BooksService, private router: Router) {}

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
      isAvailable: new FormControl(false),
    });
  }

  submit() {
    const formData = { ...this.form.value };
    const newBook: Book = {
      title: formData.title,
      author: formData.author,
      isAvailable: JSON.parse(formData.isAvailable),
    };
    this.booksService.addBook(newBook);
    this.router.navigate(['/admin-services']);
  }
}

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
import { User, UsersService } from '../services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class EditUserComponent implements OnInit {
  user: User;
  form: FormGroup;
  isEdited: boolean;

  constructor(
    private router: ActivatedRoute,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      if (history.state && history.state.user) {
        this.user = history.state && history.state.user;
      } else {
        throw Error('Something wrong with user');
      }
    });

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.email,
      ]),
    });
  }

  submit() {
    const editedUser = this.form.value;
    editedUser.id = this.user.id;
    editedUser.books = this.user.books;
    if (this.user.id) {
      this.userService
        .editUser(this.user.id, editedUser)
        .subscribe((responce) => {
          responce.books = editedUser.books;
          this.isEdited = true;
          console.log(responce);
        });
    } else {
      throw new Error('Something wrong with id');
    }
  }
}

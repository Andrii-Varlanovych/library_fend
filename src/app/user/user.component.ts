import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  NavigationExtras,
  Params,
  Router,
} from '@angular/router';
import { Book, BooksService } from '../services/books.service';
import { User, UsersService } from '../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class UserComponent implements OnInit {
  user: User;
  isShowUserBooks: boolean;
  isDeleted: boolean;
  constructor(
    private router: Router,
    private rout: ActivatedRoute,
    private booksService: BooksService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.rout.params.subscribe((params: Params) => {
      if (history.state && history.state.user) {
        this.user = history.state && history.state.user;
      } else {
        throw Error('Something wrong with user');
      }
      if (this.user.id) {
        this.booksService.fetchUserBooks(this.user.id).subscribe((responce) => {
          this.user.books = responce;
        });
      }
    });
  }

  editUser(user: User) {
    const navigationExtras: NavigationExtras = {
      state: {
        user: user,
      },
    };
    this.router.navigate(['user', `${this.user.id}`, 'edit'], navigationExtras);
  }

  deleteUser(userId: number | undefined) {
    if (typeof userId === 'number') {
      this.usersService.deleteUser(userId);
    } else {
      throw Error('Something wrong with Book ID');
    }
    this.isDeleted = true;
  }
}

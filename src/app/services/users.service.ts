import { Injectable } from '@angular/core';
import { Book } from './books.service';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface User {
  id?: number;
  name: string;
  surname: string;
  email: string;
  books: Book[] | null;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private httpService: HttpService, private router: Router) {}

  findUserById(userId: number): Observable<User> {
    return this.httpService.findUserById(userId).pipe(
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  findUserByName(searchingFragment: string) {
    return this.httpService.findUserByName(searchingFragment).pipe(
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  findUserBySurname(searchingFragment: string): Observable<User[]> {
    return this.httpService.findUserBySurname(searchingFragment).pipe(
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  findUserByEmail(searchingFragment: string): Observable<User[]> {
    return this.httpService.findUserByEmail(searchingFragment).pipe(
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  fetchUsers(): Observable<User[]> {
    return this.httpService.fetchUsers().pipe(
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  addUser(newUser: User): Observable<User> {
    return this.httpService.addUser(newUser).pipe(
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  deleteUser(id: number) {
    this.httpService.deleteUser(id).subscribe(
      () => {},
      (error) => {
        this.router.navigate(['error'], {
          queryParams: {
            message: error.error.message,
            status: error.status,
            timestamp: error.error.timestamp,
          },
        });
      }
    );
  }

  editUser(id: number, user: User): Observable<User> {
    return this.httpService.editUser(id, user).pipe(
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  errorHandler(error: HttpErrorResponse) {
    this.router.navigate(['error'], {
      queryParams: {
        message: error.error.message,
        status: error.status,
        timestamp: error.error.timestamp,
      },
    });
    return throwError(error);
  }
}

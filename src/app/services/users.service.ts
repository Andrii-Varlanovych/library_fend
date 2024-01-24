import { Injectable } from '@angular/core';
import { Book } from './books.service';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';

export interface User {
  id?: number;
  name: string;
  surname: string;
  email: string;
  books: Book[];
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private httpService: HttpService, private router: Router) {}

  findUserById(userId: number): Observable<User> {
    return this.httpService.findUserById(userId).pipe(
      catchError((error) => {
        console.log(error);
        this.router.navigate(['error'], {
          queryParams: {
            message: error.error.message,
            status: error.status,
            timestamp: error.error.timestamp,
          },
        });
        throw error;
      })
    );
  }
}

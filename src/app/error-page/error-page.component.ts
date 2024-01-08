import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyError } from '../services/books.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class ErrorPageComponent implements OnInit {
  error: MyError;

  constructor(private router: ActivatedRoute) {}
  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.error = params as MyError;
    });
  }
}

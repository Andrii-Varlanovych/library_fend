import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { AboutComponent } from './about/about.component';
import { BookComponent } from './book/book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AboutExtraComponent } from './about-extra/about-extra.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { UserServicesComponent } from './user-services/user-services.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'about',
    component: AboutComponent,
    children: [{ path: 'extra', component: AboutExtraComponent }],
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'books',
    component: BooksComponent,
    children: [{ path: 'add-book', component: AddBookComponent }],
  },
  {
    path: 'book/:id',
    component: BookComponent,
    children: [{ path: 'edit', component: EditBookComponent }],
  },
  { path: 'user-services', component: UserServicesComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: 'error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

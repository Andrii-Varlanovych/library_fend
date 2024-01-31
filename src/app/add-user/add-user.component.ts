import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UsersService } from '../services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class AddUserComponent {
  form: FormGroup;
  isAdded: boolean;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
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
    const formData = { ...this.form.value };
    const newUser: User = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      books: null,
    };
    this.usersService.addUser(newUser).subscribe((responce) => {
      this.isAdded = true;
    });
  }
}

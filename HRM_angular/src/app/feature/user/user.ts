import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../shared/models';
import { UserService } from '../../core/services/user-service';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserComponent implements OnInit {

  users: User[] = [];

  user: User = {
    username: '',
    role: 'Employee',
    token: '',
  };

  isEdit = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  // GET USERS
  getUsers(): void {

    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // ADD USER
  addUser(): void {

    this.userService.addUser(this.user).subscribe({
      next: () => {
        this.getUsers();
        this.resetForm();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // EDIT USER
  editUser(user: User): void {

    this.user = { ...user };

    this.isEdit = true;
  }

  // UPDATE USER
  updateUser(): void {

    if (!this.user.id) return;

    this.userService
      .updateUser(this.user.id, this.user)
      .subscribe({
        next: () => {
          this.getUsers();
          this.resetForm();
          this.isEdit = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // DELETE USER
  deleteUser(id?: string): void {

    if (!id) return;

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.getUsers();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // RESET FORM
  resetForm(): void {

    this.user = {
      username: '',
      role: 'Employee',
      token: '',
    };

    this.isEdit = false;
  }
}
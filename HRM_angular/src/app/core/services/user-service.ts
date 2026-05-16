import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../../shared/models';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = `${environment.apiUrl}users`;

  constructor(private http: HttpClient) {}

  // GET ALL USERS
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // GET USER BY ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/${id}`
    );
  }

  // ADD USER
  addUser(user: User): Observable<User> {
    return this.http.post<User>(
      this.apiUrl,
      user
    );
  }

  // UPDATE USER
  updateUser(
    id: string,
    user: User
  ): Observable<User> {

    return this.http.put<User>(
      `${this.apiUrl}/${id}`,
      user
    );
  }

  // DELETE USER
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}

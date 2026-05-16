import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // GET ALL
  getAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(
      `${this.baseUrl}/${endpoint}`
    );
  }

  // GET BY ID
  getById<T>(
    endpoint: string,
    id: string
  ): Observable<T> {

    return this.http.get<T>(
      `${this.baseUrl}/${endpoint}/${id}`
    );
  }

  // CREATE
  create<T>(
    endpoint: string,
    data: T
  ): Observable<T> {

    return this.http.post<T>(
      `${this.baseUrl}/${endpoint}`,
      data
    );
  }

  // UPDATE
  update<T>(
    endpoint: string,
    id: string,
    data: T
  ): Observable<T> {

    return this.http.put<T>(
      `${this.baseUrl}/${endpoint}/${id}`,
      data
    );
  }

  // DELETE
  delete<T>(
    endpoint: string,
    id: string
  ): Observable<T> {

    return this.http.delete<T>(
      `${this.baseUrl}/${endpoint}/${id}`
    );
  }
}
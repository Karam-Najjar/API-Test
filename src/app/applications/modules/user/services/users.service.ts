import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { AuthService } from '../../../../auth/services/auth.service';
import { UserListResponse } from '../interfaces/user-list-response.interface';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  userDeletedSubject = new Subject();
  error = new Subject();
  ID: string | null = this.authService.gettingId();
  baseUrl: string = 'https://dummyapi.io/data/v1/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchData(
    endPoint: string,
    page: number = 0,
    limit: number = 20
  ): Observable<UserListResponse> {
    const url = `${this.baseUrl}${endPoint}&page=${page}&limit=${limit}`;
    return this.http.get<UserListResponse>(url);
  }

  createUser(user: User): Observable<User> {
    const url = `${this.baseUrl}user/create`;
    return this.http.post<User>(url, user);
  }

  updateUser(userId: string, formData: User) {
    const url = `${this.baseUrl}user/${userId}`;
    return this.http.put<User>(url, formData);
  }

  deleteUser(userId: string) {
    const url = `${this.baseUrl}user/${userId}`;
    return this.http.delete(url).subscribe(() => {
      this.userDeletedSubject.next(userId);
    });
  }

  viewUser(userId: string): Observable<User> {
    const url = `${this.baseUrl}user/${userId}`;
    return this.http.get<User>(url);
  }

  getUserById(id: string) {
    const url = `${this.baseUrl}user/${id}`;
    return this.http.get(url);
  }
}

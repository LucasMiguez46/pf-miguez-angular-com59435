import { Injectable } from '@angular/core';
import { User } from '../../features/dashboard/users/models';
import { concatMap, map, Observable} from 'rxjs';
import { generateRandomString } from '../../shared/utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseURL = environment.apiBaseURL;

  constructor(private httpClient: HttpClient) { }

  getById(id: string): Observable<User | undefined> {
    return this.httpClient.get<User>(`${this.baseURL}/users/${id}`);
  }
  
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}/users`);
  }

  getIsUserAdmin(role: string): Observable<boolean>{
    return this.httpClient.get<User>(`${this.baseURL}/users/${role}`).pipe(
      map((user: User) => {
        return user.role === 'admin';
      }),
    )
  }

  getAuthenticatedUser(): Observable<User | undefined> {
    return this.httpClient.get<User>(`${this.baseURL}/auth/user`);
  }


  createUser(data: Omit<User, 'id'>): Observable<User> {
    return this.httpClient.post<User>(`${this.baseURL}/users`, {
      ...data,
      role: 'USER',
      password: generateRandomString(8),
      token: generateRandomString(20),
      createdAt: new Date().toISOString(),
    });
  }

  removeUserById(id: string): Observable<User[]> {
    return this.httpClient
      .delete<User>(`${this.baseURL}/users/${id}`)
      .pipe(concatMap(() => this.getUsers()));
  }

  updateUserById(id: string, update: Partial<User>) {
    return this.httpClient
      .patch<User>(`${this.baseURL}/users/${id}`, update)
      .pipe(concatMap(() => this.getUsers()));
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, throwError } from 'rxjs';
import { User } from '../../features/dashboard/users/models';
import { Router } from '@angular/router';
import { AuthData } from '../../features/auth/models';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authUser$ = new BehaviorSubject<null | User>(null);

  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router, private httpClient:HttpClient) {}

  private extraRevisionLoginVerify(users: User[]): User | null{
    if (!!users[0]) {
      this._authUser$.next(users[0]);
      localStorage.setItem('token', users[0].token);
      return users[0]
    }else{
      return null;
    }
  }

  login(data: AuthData): Observable<User> {

    return this.httpClient.get<User[]>(`http://localhost:3000/users?gmail=${data.gmail}&password=${data.password}`)
    .pipe(map((users) => {
      const user = this.extraRevisionLoginVerify(users)

      if (user) {
        return user
      }else{
        throw new Error('datos invalidos');
      }
    }))
  }

  logout() {
    this._authUser$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }

  verifyToken(): Observable<boolean> {
    return this.httpClient.get<User[]>(`http://localhost:3000/users?token=${localStorage.getItem('token')}`)
    .pipe(map((users) => {
      const user = this.extraRevisionLoginVerify(users)
      return !!user;
    }))
  }
}
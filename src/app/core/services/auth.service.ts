import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../../features/dashboard/users/models';
import { generateRandomString } from '../../shared/utils';
import { Router } from '@angular/router';
import { AuthData } from '../../features/auth/models';

const FAKE_USER: User = {
  gmail: 'admin@gmail.com',
  primerNombre: 'admin',
  ultimoNombre: 'admin',
  id: generateRandomString(4),
  createdAt: new Date(),
  curso: 'curso-1',
  password: '123456',
  token: 'probando123',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authUser$ = new BehaviorSubject<null | User>(null);

  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) {}

  login(data: AuthData): Observable<User> {
    if (data.gmail != FAKE_USER.gmail || data.password != FAKE_USER.password) {
      return throwError(() => new Error('Los datos son invalidos'));
    }
    this._authUser$.next(FAKE_USER);
    localStorage.setItem('token', FAKE_USER.token);
    return of(FAKE_USER);
  }

  logout() {
    this._authUser$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }

  verifyToken(): Observable<boolean> {
    const isValid = localStorage.getItem('token') === FAKE_USER.token;
    if (isValid) {
      this._authUser$.next(FAKE_USER);
    } else {
      this._authUser$.next(null);
    }
    return of(isValid);
  }
}
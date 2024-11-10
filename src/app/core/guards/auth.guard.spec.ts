import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../../features/dashboard/users/models';
import { AuthData } from '../../features/auth/models';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mocks de usuario y auth data
const mockUser: User = {
  id: 'dsds',
  primerNombre: 'Mock',
  ultimoNombre: 'Mock',
  gmail: 'mockuser@mail.com',
  password: '123456',
  role: 'USER',
  curso: 'l0WY',
  createdAt: new Date(),
  token: 'FJDSFNSDvmfSKDdmsddaamds', // Simulamos un token válido
};

const mockAuthData: AuthData = {
  gmail: 'mockuser@mail.com',
  password: '123456',
};

describe('AuthGuard', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService, 
        { provide: Router, useValue: { createUrlTree: jasmine.createSpy('createUrlTree') } } // Mock del router
      ]
    });

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('Debe permitir el acceso si el token es válido', (done) => {
    // Simulamos que el token es válido usando el mockUser.token
    spyOn(authService, 'verifyToken').and.returnValue(of(true)); 

    const result = authGuard(null as any, null as any);

    if (result instanceof Observable) {
      result.subscribe((canActivate) => {
        expect(canActivate).toBeTrue(); // Si el token es válido, esperamos true
        done();
      });
    } else {
      fail('El resultado no es un Observable');
      done();
    }
  });

  it('Debe redirigir si el token no es válido', (done) => {
    // Simulamos que el token es inválido
    spyOn(authService, 'verifyToken').and.returnValue(of(false)); 

    const result = authGuard(null as any, null as any);

    if (result instanceof Observable) {
      result.subscribe((canActivate) => {
        expect(canActivate instanceof UrlTree).toBeTrue(); // Si el token es inválido, esperamos una UrlTree
        done();
      });
    } else {
      fail('El resultado no es un Observable');
      done();
    }
  });
});
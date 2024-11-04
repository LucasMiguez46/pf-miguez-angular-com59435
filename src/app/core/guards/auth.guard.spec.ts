import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('authGuard', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue('/auth/login'),
          },
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('Debe permitir el acceso si el token es válido', (done) => {
    spyOn(authService, 'verifyToken').and.returnValue(of(true)); 

    const result = authGuard(null as any, null as any);

    if (result instanceof Observable) {
      result.subscribe((canActivate) => {
        expect(canActivate).toBeTrue(); 
        done();
      });
    } else {
      expect(result).toBeTrue(); 
      done();
    }
  });

  it('Debe redirigir a /auth/login si el token es inválido', (done) => {
    spyOn(authService, 'verifyToken').and.returnValue(of(false));

    const result = authGuard(null as any, null as any);

    if (result instanceof Observable) {
      result.subscribe((canActivate) => {
        expect(canActivate).toEqual(router.createUrlTree(['auth', 'login']));
        done();
      });
    } else {
      expect(result).toEqual(router.createUrlTree(['auth', 'login']));
      done();
    }
  });
});

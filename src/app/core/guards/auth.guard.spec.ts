import { TestBed } from '@angular/core/testing';
import { ParamMap, Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';

fdescribe('AuthGuard', () => {
  let authService: AuthService;
  let router: Router;
  let mockUrlTree: UrlTree;

  beforeEach(() => {
    const mockUrlSegmentGroup = new UrlSegmentGroup([], {});
    mockUrlSegmentGroup.segments = [new UrlSegment('login', {})];

    const mockQueryParamMap: ParamMap = {
      get: (key: string) => key === 'returnUrl' ? '/dashboard' : null,
      has: (key: string) => key === 'returnUrl',
      keys: ['returnUrl'],
      getAll: function (name: string): string[] {
        throw new Error('Function not implemented.');
      }
    };
    
    mockUrlTree = {
      root: mockUrlSegmentGroup,
      queryParams: { returnUrl: '/dashboard' },
      queryParamMap: mockQueryParamMap,
      fragment: null,
      toString: jasmine.createSpy('toString').and.returnValue('/auth/login') // Mock de la función toString
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: {
            createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue(mockUrlTree),
          },
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('Debe permitir el acceso si el token es válido', (done) => {
    spyOn(authService, 'verifyToken').and.returnValue(of(true));

    TestBed.runInInjectionContext(() => {
      const result = authGuard(null as any, null as any);

      if (result instanceof Observable) {
        result.subscribe((canActivate) => { 
          expect(canActivate).toBeTrue(); 
          done();
        });
      } else {
        fail('El resultado no es un Observable');
        done();
      }
    });
  });

  it('Debe redirigir si el token no es válido', (done) => {
    spyOn(authService, 'verifyToken').and.returnValue(of(false));

    TestBed.runInInjectionContext(() => {
      const result = authGuard(null as any, null as any);

      if (result instanceof Observable) {
        result.subscribe((canActivate) => {
          expect(canActivate).toBe(mockUrlTree);
          done();
        });
      } else {
        fail('El resultado no es un Observable');
        done();
      }
    });
  });
});
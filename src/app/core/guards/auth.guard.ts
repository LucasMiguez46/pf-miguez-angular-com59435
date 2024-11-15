import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verifyToken().pipe(
    map((isValid) => {

      if (isValid) {
        return true;
      } else {
        const urlTree = router.createUrlTree(['auth', 'login']);
        return urlTree;
      }
    })
  );
};

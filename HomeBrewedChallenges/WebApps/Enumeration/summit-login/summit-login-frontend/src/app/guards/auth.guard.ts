import { CanActivateFn } from '@angular/router';
import { JwtService } from '../services/jwt.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * This guard can be bypassed by client side attacks
 * Additional server side verification is done on all /secured/ app requests
 */
export const authGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  if (jwtService.hasUnexpiredToken()) {
    // Proceed to /secured/ component
    return true;
  }

  return router.navigate(['/login']);
};

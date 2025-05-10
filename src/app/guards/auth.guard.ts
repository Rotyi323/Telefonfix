import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const router = inject(Router);

  if (!isLoggedIn) {
    alert('Ez az oldal csak bejelentkezés után érhető el.');
    router.navigate(['/']);
    return false;
  }

  return true;
};

import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export const isLoggedInGaurd: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLoggedIn())
  {
    router.navigate(['']);
    return false;
  }
  return true;
};

export const loggedInGaurd: CanActivateFn =  (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isLoggedIn())
  {
    router.navigate(['login']);
    return false;
  }
  return true;
};

export const loggedInChildGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isLoggedIn())
    {
      router.navigate(['login']);
      return false;
    }
    return true;
};

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
};

export const deactivateGaurd: CanDeactivateFn<CanComponentDeactivate> = (component: CanComponentDeactivate) => {
  if (component.canDeactivate)
  {
    return component.canDeactivate();
  }
  return true;
};
import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, CanDeactivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';
import { BackendAdminService } from './admin/backend-admin.service';
import { admin } from './admin/admin/admin.module';

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

export const adminGaurd: CanActivateFn =  (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const adminService = inject(BackendAdminService);

  return adminService.getAdmin(authService.getUid())
  .pipe(map(
    (isadmin: admin|undefined) => {
      if(isadmin)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  ));
};

export const loggedInLoadGaurd: CanMatchFn =  (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isLoggedIn())
  {
    router.navigate(['login']);
    return false;
  }
  return true;
};
import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { routeAccessGuard } from './route-access.guard';

describe('routeAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => routeAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

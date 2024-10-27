import { TestBed } from '@angular/core/testing';

import { BackendAdminService } from './backend-admin.service';

describe('BackendAdminService', () => {
  let service: BackendAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

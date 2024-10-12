import { TestBed } from '@angular/core/testing';

import { BedragService } from './bedrag.service';

describe('BedragService', () => {
  let service: BedragService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BedragService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

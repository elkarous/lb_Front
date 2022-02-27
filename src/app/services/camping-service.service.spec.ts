import { TestBed } from '@angular/core/testing';

import { CampingServiceService } from './camping-service.service';

describe('CampingServiceService', () => {
  let service: CampingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

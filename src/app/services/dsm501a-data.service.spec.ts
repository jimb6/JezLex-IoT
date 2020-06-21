import { TestBed } from '@angular/core/testing';

import { Dsm501aDataService } from './dsm501a-data.service';

describe('Dsm501aDataService', () => {
  let service: Dsm501aDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dsm501aDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

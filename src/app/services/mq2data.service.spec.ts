import { TestBed } from '@angular/core/testing';

import { Mq2dataService } from './mq2data.service';

describe('Mq2dataService', () => {
  let service: Mq2dataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mq2dataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

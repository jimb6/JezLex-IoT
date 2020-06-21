import { TestBed } from '@angular/core/testing';

import { Mq135DataService } from './mq135-data.service';

describe('Mq135DataService', () => {
  let service: Mq135DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mq135DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HumiditySensorService } from './humidity-sensor.service';

describe('HumiditySensorService', () => {
  let service: HumiditySensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HumiditySensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

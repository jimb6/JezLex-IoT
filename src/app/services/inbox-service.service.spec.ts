import { TestBed } from '@angular/core/testing';

import { InboxServiceService } from './inbox-service.service';

describe('InboxServiceService', () => {
  let service: InboxServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InboxServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

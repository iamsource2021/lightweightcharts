import { TestBed } from '@angular/core/testing';

import { RatesSubscriptionService } from './rates-subscription.service';

describe('RatesSubscriptionService', () => {
  let service: RatesSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatesSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

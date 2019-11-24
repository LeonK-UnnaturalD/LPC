/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BuyersService } from './Buyers.service';

describe('Service: Buyers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuyersService]
    });
  });

  it('should ...', inject([BuyersService], (service: BuyersService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BuisnessService } from './Buisness.service';

describe('Service: Buisness', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuisnessService]
    });
  });

  it('should ...', inject([BuisnessService], (service: BuisnessService) => {
    expect(service).toBeTruthy();
  }));
});

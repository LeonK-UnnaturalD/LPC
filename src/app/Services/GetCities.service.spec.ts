/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetCitiesService } from './GetCities.service';

describe('Service: GetCities', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCitiesService]
    });
  });

  it('should ...', inject([GetCitiesService], (service: GetCitiesService) => {
    expect(service).toBeTruthy();
  }));
});

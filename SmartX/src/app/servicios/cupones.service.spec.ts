import { TestBed, inject } from '@angular/core/testing';

import { CuponesService } from './cupones.service';

describe('CuponesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CuponesService]
    });
  });

  it('should be created', inject([CuponesService], (service: CuponesService) => {
    expect(service).toBeTruthy();
  }));
});

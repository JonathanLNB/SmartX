import { TestBed, inject } from '@angular/core/testing';

import { ProviderServiceService } from './provider-service.service';

describe('ProviderServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProviderServiceService]
    });
  });

  it('should be created', inject([ProviderServiceService], (service: ProviderServiceService) => {
    expect(service).toBeTruthy();
  }));
});

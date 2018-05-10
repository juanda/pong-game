import { TestBed, inject } from '@angular/core/testing';

import { FpsmeterService } from './fpsmeter.service';

describe('FpsmeterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FpsmeterService]
    });
  });

  it('should be created', inject([FpsmeterService], (service: FpsmeterService) => {
    expect(service).toBeTruthy();
  }));
});

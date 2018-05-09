import { TestBed, inject } from '@angular/core/testing';

import { RunOptionsService } from './run-options.service';

describe('RunOptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RunOptionsService]
    });
  });

  it('should be created', inject([RunOptionsService], (service: RunOptionsService) => {
    expect(service).toBeTruthy();
  }));
});

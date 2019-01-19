import { TestBed } from '@angular/core/testing';

import { AdimnAuthGuardService } from './adimn-auth-guard.service';

describe('AdimnAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdimnAuthGuardService = TestBed.get(AdimnAuthGuardService);
    expect(service).toBeTruthy();
  });
});

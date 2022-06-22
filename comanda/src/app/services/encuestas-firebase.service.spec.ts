import { TestBed } from '@angular/core/testing';

import { EncuestasFirebaseService } from './encuestas-firebase.service';

describe('EncuestasFirebaseService', () => {
  let service: EncuestasFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncuestasFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

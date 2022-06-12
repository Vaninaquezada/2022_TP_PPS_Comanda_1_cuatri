import { TestBed } from '@angular/core/testing';

import { ArchivosFirebaseService } from './archivos-firebase.service';

describe('ArchivosFirebaseService', () => {
  let service: ArchivosFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivosFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

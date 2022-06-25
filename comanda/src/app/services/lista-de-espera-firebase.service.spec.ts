import { TestBed } from '@angular/core/testing';

import { ListaDeEsperaFirebaseService } from './lista-de-espera-firebase.service';

describe('ListaDeEsperaFirebaseService', () => {
  let service: ListaDeEsperaFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaDeEsperaFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PedidosFirebaseService } from './pedidos-firebase.service';

describe('PedidosFirebaseService', () => {
  let service: PedidosFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

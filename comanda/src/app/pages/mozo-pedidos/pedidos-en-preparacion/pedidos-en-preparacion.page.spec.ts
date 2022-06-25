import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidosEnPreparacionPage } from './pedidos-en-preparacion.page';

describe('PedidosEnPreparacionPage', () => {
  let component: PedidosEnPreparacionPage;
  let fixture: ComponentFixture<PedidosEnPreparacionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosEnPreparacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidosEnPreparacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

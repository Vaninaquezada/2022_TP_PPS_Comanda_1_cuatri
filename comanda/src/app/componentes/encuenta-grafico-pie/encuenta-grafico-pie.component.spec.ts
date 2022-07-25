import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EncuentaGraficoPieComponent } from './encuenta-grafico-pie.component';

describe('EncuentaGraficoPieComponent', () => {
  let component: EncuentaGraficoPieComponent;
  let fixture: ComponentFixture<EncuentaGraficoPieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuentaGraficoPieComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EncuentaGraficoPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

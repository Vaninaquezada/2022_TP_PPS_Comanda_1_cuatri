import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EncuentaGraficoBarrasComponent } from './encuenta-grafico-barras.component';

describe('EncuentaGraficoBarrasComponent', () => {
  let component: EncuentaGraficoBarrasComponent;
  let fixture: ComponentFixture<EncuentaGraficoBarrasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuentaGraficoBarrasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EncuentaGraficoBarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

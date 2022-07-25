import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EncuentaGraficoDoughnutComponent } from './encuenta-grafico-doughnut.component';

describe('EncuentaGraficoDoughnutComponent', () => {
  let component: EncuentaGraficoDoughnutComponent;
  let fixture: ComponentFixture<EncuentaGraficoDoughnutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuentaGraficoDoughnutComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EncuentaGraficoDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

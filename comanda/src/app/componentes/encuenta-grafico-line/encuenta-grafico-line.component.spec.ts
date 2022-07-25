import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EncuentaGraficoLineComponent } from './encuenta-grafico-line.component';

describe('EncuentaGraficoLineComponent', () => {
  let component: EncuentaGraficoLineComponent;
  let fixture: ComponentFixture<EncuentaGraficoLineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuentaGraficoLineComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EncuentaGraficoLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

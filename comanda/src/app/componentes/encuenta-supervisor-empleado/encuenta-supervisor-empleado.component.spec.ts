import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EncuentaSupervisorEmpleadoComponent } from './encuenta-supervisor-empleado.component';

describe('EncuentaSupervisorEmpleadoComponent', () => {
  let component: EncuentaSupervisorEmpleadoComponent;
  let fixture: ComponentFixture<EncuentaSupervisorEmpleadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuentaSupervisorEmpleadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EncuentaSupervisorEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

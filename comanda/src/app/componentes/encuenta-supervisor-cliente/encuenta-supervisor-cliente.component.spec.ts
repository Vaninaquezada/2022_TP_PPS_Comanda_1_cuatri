import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EncuentaSupervisorClienteComponent } from './encuenta-supervisor-cliente.component';

describe('EncuentaSupervisorClienteComponent', () => {
  let component: EncuentaSupervisorClienteComponent;
  let fixture: ComponentFixture<EncuentaSupervisorClienteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuentaSupervisorClienteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EncuentaSupervisorClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

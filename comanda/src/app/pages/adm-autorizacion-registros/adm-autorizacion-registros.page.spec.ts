import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdmAutorizacionRegistrosPage } from './adm-autorizacion-registros.page';

describe('AdmAutorizacionRegistrosPage', () => {
  let component: AdmAutorizacionRegistrosPage;
  let fixture: ComponentFixture<AdmAutorizacionRegistrosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmAutorizacionRegistrosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdmAutorizacionRegistrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

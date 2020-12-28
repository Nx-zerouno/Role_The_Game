import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MissioneConsultaPage } from './missione-consulta.page';

describe('MissioneConsultaPage', () => {
  let component: MissioneConsultaPage;
  let fixture: ComponentFixture<MissioneConsultaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissioneConsultaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MissioneConsultaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

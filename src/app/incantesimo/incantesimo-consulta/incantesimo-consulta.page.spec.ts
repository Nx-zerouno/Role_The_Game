import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncantesimoConsultaPage } from './incantesimo-consulta.page';

describe('IncantesimoConsultaPage', () => {
  let component: IncantesimoConsultaPage;
  let fixture: ComponentFixture<IncantesimoConsultaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncantesimoConsultaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncantesimoConsultaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

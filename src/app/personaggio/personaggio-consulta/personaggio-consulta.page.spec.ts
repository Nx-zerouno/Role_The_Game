import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonaggioConsultaPage } from './personaggio-consulta.page';

describe('PersonaggioConsultaPage', () => {
  let component: PersonaggioConsultaPage;
  let fixture: ComponentFixture<PersonaggioConsultaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaggioConsultaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaggioConsultaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

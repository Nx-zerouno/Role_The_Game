import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonaggioListaPage } from './personaggio-lista.page';

describe('PersonaggioListaPage', () => {
  let component: PersonaggioListaPage;
  let fixture: ComponentFixture<PersonaggioListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaggioListaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaggioListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

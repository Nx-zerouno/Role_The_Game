import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonaggioAggiungiPage } from './personaggio-aggiungi.page';

describe('PersonaggioAggiungiPage', () => {
  let component: PersonaggioAggiungiPage;
  let fixture: ComponentFixture<PersonaggioAggiungiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaggioAggiungiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaggioAggiungiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

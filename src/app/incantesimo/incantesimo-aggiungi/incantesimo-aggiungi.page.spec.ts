import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncantesimoAggiungiPage } from './incantesimo-aggiungi.page';

describe('IncantesimoAggiungiPage', () => {
  let component: IncantesimoAggiungiPage;
  let fixture: ComponentFixture<IncantesimoAggiungiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncantesimoAggiungiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncantesimoAggiungiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

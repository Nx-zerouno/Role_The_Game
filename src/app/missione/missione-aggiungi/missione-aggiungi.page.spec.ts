import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MissioneAggiungiPage } from './missione-aggiungi.page';

describe('MissioneAggiungiPage', () => {
  let component: MissioneAggiungiPage;
  let fixture: ComponentFixture<MissioneAggiungiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissioneAggiungiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MissioneAggiungiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

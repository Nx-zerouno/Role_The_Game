import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MissioneListaPage } from './missione-lista.page';

describe('MissioneListaPage', () => {
  let component: MissioneListaPage;
  let fixture: ComponentFixture<MissioneListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissioneListaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MissioneListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncantesimoPreferitiPage } from './incantesimo-preferiti.page';

describe('IncantesimoPreferitiPage', () => {
  let component: IncantesimoPreferitiPage;
  let fixture: ComponentFixture<IncantesimoPreferitiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncantesimoPreferitiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncantesimoPreferitiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

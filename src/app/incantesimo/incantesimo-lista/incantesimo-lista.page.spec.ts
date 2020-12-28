import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncantesimoListaPage } from './incantesimo-lista.page';

describe('IncantesimoListaPage', () => {
  let component: IncantesimoListaPage;
  let fixture: ComponentFixture<IncantesimoListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncantesimoListaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncantesimoListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

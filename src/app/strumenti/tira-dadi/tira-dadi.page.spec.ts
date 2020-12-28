import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TiraDadiPage } from './tira-dadi.page';

describe('TiraDadiPage', () => {
  let component: TiraDadiPage;
  let fixture: ComponentFixture<TiraDadiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiraDadiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TiraDadiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

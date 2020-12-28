import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccediPage } from './accedi.page';

describe('AccediPage', () => {
  let component: AccediPage;
  let fixture: ComponentFixture<AccediPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccediPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccediPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

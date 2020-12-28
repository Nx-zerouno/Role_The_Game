import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistratiPage } from './registrati.page';

describe('RegistratiPage', () => {
  let component: RegistratiPage;
  let fixture: ComponentFixture<RegistratiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistratiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistratiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

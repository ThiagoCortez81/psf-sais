import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrimeiroAcessoComponent } from './primeiro-acesso.component';

describe('PrimeiroAcessoComponent', () => {
  let component: PrimeiroAcessoComponent;
  let fixture: ComponentFixture<PrimeiroAcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeiroAcessoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrimeiroAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

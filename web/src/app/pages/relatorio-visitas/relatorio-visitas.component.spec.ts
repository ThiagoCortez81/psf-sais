import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioVisitasComponent } from './relatorio-visitas.component';

describe('RelatorioVisitasComponent', () => {
  let component: RelatorioVisitasComponent;
  let fixture: ComponentFixture<RelatorioVisitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioVisitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

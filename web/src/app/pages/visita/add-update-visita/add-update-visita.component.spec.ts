import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateVisitaComponent } from './add-update-visita.component';

describe('AddUpdateVisitaComponent', () => {
  let component: AddUpdateVisitaComponent;
  let fixture: ComponentFixture<AddUpdateVisitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateVisitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

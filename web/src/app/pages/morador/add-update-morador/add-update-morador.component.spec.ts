import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateMoradorComponent } from './add-update-morador.component';

describe('AddUpdateMoradorComponent', () => {
  let component: AddUpdateMoradorComponent;
  let fixture: ComponentFixture<AddUpdateMoradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateMoradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateMoradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdatePsfComponent } from './add-update-psf.component';

describe('AddUpdatePsfComponent', () => {
  let component: AddUpdatePsfComponent;
  let fixture: ComponentFixture<AddUpdatePsfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdatePsfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdatePsfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

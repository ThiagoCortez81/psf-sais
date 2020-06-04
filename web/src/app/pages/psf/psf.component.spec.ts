import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsfComponent } from './psf.component';

describe('PsfComponent', () => {
  let component: PsfComponent;
  let fixture: ComponentFixture<PsfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

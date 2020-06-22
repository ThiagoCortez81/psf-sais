import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaViewComponent } from './agenda-view.component';

describe('AgendaViewComponent', () => {
  let component: AgendaViewComponent;
  let fixture: ComponentFixture<AgendaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

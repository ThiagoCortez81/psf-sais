import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateFuncionarioComponent } from './add-update-funcionario.component';

describe('AddUpdateFuncionarioComponent', () => {
  let component: AddUpdateFuncionarioComponent;
  let fixture: ComponentFixture<AddUpdateFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

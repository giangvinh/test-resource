import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinePasswordDialogComponent } from './define-password-dialog.component';

describe('DefinePasswordDialogComponent', () => {
  let component: DefinePasswordDialogComponent;
  let fixture: ComponentFixture<DefinePasswordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinePasswordDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinePasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

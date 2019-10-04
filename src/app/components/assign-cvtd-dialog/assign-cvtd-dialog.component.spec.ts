import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCvtdDialogComponent } from './assign-cvtd-dialog.component';

describe('AssignCvtdDialogComponent', () => {
  let component: AssignCvtdDialogComponent;
  let fixture: ComponentFixture<AssignCvtdDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignCvtdDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCvtdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

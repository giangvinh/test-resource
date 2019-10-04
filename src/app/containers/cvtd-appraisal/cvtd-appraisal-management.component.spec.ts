import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvtdAppraisalManagementComponent } from './cvtd-appraisal-management.component';

describe('CvtdAppraisalManagementComponent', () => {
  let component: CvtdAppraisalManagementComponent;
  let fixture: ComponentFixture<CvtdAppraisalManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvtdAppraisalManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvtdAppraisalManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

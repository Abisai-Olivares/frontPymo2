import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDetailsFormComponent } from './hospital-details-form.component';

describe('HospitalDetailsFormComponent', () => {
  let component: HospitalDetailsFormComponent;
  let fixture: ComponentFixture<HospitalDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalDetailsFormComponent]
    });
    fixture = TestBed.createComponent(HospitalDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDiscountManagementComponent } from './detail-discount-management.component';

describe('DetailDiscountManagementComponent', () => {
  let component: DetailDiscountManagementComponent;
  let fixture: ComponentFixture<DetailDiscountManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailDiscountManagementComponent]
    });
    fixture = TestBed.createComponent(DetailDiscountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

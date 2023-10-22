import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderingManagementComponent } from './ordering-management.component';

describe('OrderingManagementComponent', () => {
  let component: OrderingManagementComponent;
  let fixture: ComponentFixture<OrderingManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderingManagementComponent]
    });
    fixture = TestBed.createComponent(OrderingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

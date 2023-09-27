import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesManagementComponent } from './sales-management.component';

describe('SalesManagementComponent', () => {
  let component: SalesManagementComponent;
  let fixture: ComponentFixture<SalesManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesManagementComponent]
    });
    fixture = TestBed.createComponent(SalesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

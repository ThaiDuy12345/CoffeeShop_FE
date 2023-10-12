import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductManagementComponent } from './detail-product-management.component';

describe('DetailProductManagementComponent', () => {
  let component: DetailProductManagementComponent;
  let fixture: ComponentFixture<DetailProductManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailProductManagementComponent]
    });
    fixture = TestBed.createComponent(DetailProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

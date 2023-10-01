import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAccountManagementComponent } from './detail-account-management.component';

describe('DetailAccountManagementComponent', () => {
  let component: DetailAccountManagementComponent;
  let fixture: ComponentFixture<DetailAccountManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAccountManagementComponent]
    });
    fixture = TestBed.createComponent(DetailAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

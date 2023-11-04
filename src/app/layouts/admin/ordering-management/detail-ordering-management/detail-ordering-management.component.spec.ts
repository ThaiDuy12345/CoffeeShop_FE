import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrderingManagementComponent } from './detail-ordering-management.component';

describe('DetailOrderingManagementComponent', () => {
  let component: DetailOrderingManagementComponent;
  let fixture: ComponentFixture<DetailOrderingManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailOrderingManagementComponent]
    });
    fixture = TestBed.createComponent(DetailOrderingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

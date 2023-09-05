import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepThreeOrderComponent } from './step-three-order.component';

describe('StepThreeOrderComponent', () => {
  let component: StepThreeOrderComponent;
  let fixture: ComponentFixture<StepThreeOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepThreeOrderComponent]
    });
    fixture = TestBed.createComponent(StepThreeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

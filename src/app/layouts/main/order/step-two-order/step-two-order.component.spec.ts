import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTwoOrderComponent } from './step-two-order.component';

describe('StepTwoOrderComponent', () => {
  let component: StepTwoOrderComponent;
  let fixture: ComponentFixture<StepTwoOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepTwoOrderComponent]
    });
    fixture = TestBed.createComponent(StepTwoOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

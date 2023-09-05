import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepOneOrderComponent } from './step-one-order.component';

describe('StepOneOrderComponent', () => {
  let component: StepOneOrderComponent;
  let fixture: ComponentFixture<StepOneOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepOneOrderComponent]
    });
    fixture = TestBed.createComponent(StepOneOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

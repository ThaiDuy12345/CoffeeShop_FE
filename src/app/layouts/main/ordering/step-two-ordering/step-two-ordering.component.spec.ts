import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTwoOrderingComponent } from './step-two-ordering.component';

describe('StepTwoOrderingComponent', () => {
  let component: StepTwoOrderingComponent;
  let fixture: ComponentFixture<StepTwoOrderingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepTwoOrderingComponent]
    });
    fixture = TestBed.createComponent(StepTwoOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

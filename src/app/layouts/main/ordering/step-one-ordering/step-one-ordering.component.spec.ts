import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepOneOrderingComponent } from './step-one-ordering.component';

describe('StepOneOrderingComponent', () => {
  let component: StepOneOrderingComponent;
  let fixture: ComponentFixture<StepOneOrderingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepOneOrderingComponent]
    });
    fixture = TestBed.createComponent(StepOneOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

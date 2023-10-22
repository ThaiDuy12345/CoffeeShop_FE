import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepThreeOrderingComponent } from './step-three-ordering.component';

describe('StepThreeOrderingComponent', () => {
  let component: StepThreeOrderingComponent;
  let fixture: ComponentFixture<StepThreeOrderingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepThreeOrderingComponent]
    });
    fixture = TestBed.createComponent(StepThreeOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductByFeedbackQuantityStatisticComponent } from './product-by-feedback-quantity-statistic.component';

describe('ProductByFeedbackQuantityStatisticComponent', () => {
  let component: ProductByFeedbackQuantityStatisticComponent;
  let fixture: ComponentFixture<ProductByFeedbackQuantityStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductByFeedbackQuantityStatisticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductByFeedbackQuantityStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

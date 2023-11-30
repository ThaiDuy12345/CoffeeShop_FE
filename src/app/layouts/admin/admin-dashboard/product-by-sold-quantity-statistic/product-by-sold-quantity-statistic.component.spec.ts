import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBySoldQuantityStatisticComponent } from './product-by-sold-quantity-statistic.component';

describe('ProductBySoldQuantityStatisticComponent', () => {
  let component: ProductBySoldQuantityStatisticComponent;
  let fixture: ComponentFixture<ProductBySoldQuantityStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductBySoldQuantityStatisticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductBySoldQuantityStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

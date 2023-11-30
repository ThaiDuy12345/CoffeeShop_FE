import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickStatisticViewComponent } from './quick-statistic-view.component';

describe('QuickStatisticViewComponent', () => {
  let component: QuickStatisticViewComponent;
  let fixture: ComponentFixture<QuickStatisticViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickStatisticViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuickStatisticViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

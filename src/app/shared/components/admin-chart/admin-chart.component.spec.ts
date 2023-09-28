import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChartComponent } from './admin-chart.component';

describe('ChartComponent', () => {
  let component: AdminChartComponent;
  let fixture: ComponentFixture<AdminChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChartComponent]
    });
    fixture = TestBed.createComponent(AdminChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

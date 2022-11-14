import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountTrendReportComponent } from './discount-trend-report.component';

describe('DiscountTrendReportComponent', () => {
  let component: DiscountTrendReportComponent;
  let fixture: ComponentFixture<DiscountTrendReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountTrendReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountTrendReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

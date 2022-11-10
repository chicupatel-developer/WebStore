import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductDiscountComponent } from './view-product-discount.component';

describe('ViewProductDiscountComponent', () => {
  let component: ViewProductDiscountComponent;
  let fixture: ComponentFixture<ViewProductDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

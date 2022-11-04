import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetProductDiscountComponent } from './set-product-discount.component';

describe('SetProductDiscountComponent', () => {
  let component: SetProductDiscountComponent;
  let fixture: ComponentFixture<SetProductDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetProductDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetProductDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

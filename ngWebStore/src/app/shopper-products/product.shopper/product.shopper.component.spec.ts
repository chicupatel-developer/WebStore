import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShopperComponent } from './product.shopper.component';

describe('ProductShopperComponent', () => {
  let component: ProductShopperComponent;
  let fixture: ComponentFixture<ProductShopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductShopperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

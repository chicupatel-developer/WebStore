import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopperProductsComponent } from './shopper-products.component';

describe('ShopperProductsComponent', () => {
  let component: ShopperProductsComponent;
  let fixture: ComponentFixture<ShopperProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopperProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopperProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

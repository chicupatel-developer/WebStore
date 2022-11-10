import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { ShopperProductsComponent } from './shopper-products/shopper-products.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { CartComponent } from './cart/cart.component';
import { ShoppingHistoryComponent } from './shopping-history/shopping-history.component';
import { SetProductDiscountComponent } from './set-product-discount/set-product-discount.component';
import { ViewProductDiscountComponent } from './view-product-discount/view-product-discount.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-products', component: AdminProductsComponent, canActivate: [AuthGuard] },
  { path: 'shopper-products', component: ShopperProductsComponent , canActivate: [AuthGuard] },
  { path: 'admin-reports', component: AdminReportsComponent , canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent , canActivate: [AuthGuard] },
  { path: 'shopping-history', component: ShoppingHistoryComponent, canActivate: [AuthGuard] },
  { path: 'set-product-discount', component: SetProductDiscountComponent, canActivate: [AuthGuard] },
  { path: 'view-product-discount', component: ViewProductDiscountComponent , canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
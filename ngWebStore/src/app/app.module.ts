import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

////////auth guard
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

// bs datepicker
// pagination
// search
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



import { GoogleChartsModule } from 'angular-google-charts';



// services
import { UserService } from './services/user.service';
import { LocalDataService } from './services/local-data.service';

// components
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { CartComponent } from './cart/cart.component';
import { ShoppingHistoryComponent } from './shopping-history/shopping-history.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { ShopperProductsComponent } from './shopper-products/shopper-products.component';
import { ProductComponent } from './admin-products/product/product.component';
import { SetProductDiscountComponent } from './set-product-discount/set-product-discount.component';
import { ViewProductDiscountComponent } from './view-product-discount/view-product-discount.component';
import { MonthlyReportComponent } from './admin-reports/monthly-report/monthly-report.component';
import { QuarterlyReportComponent } from './admin-reports/quarterly-report/quarterly-report.component';
import { DiscountTrendReportComponent } from './admin-reports/discount-trend-report/discount-trend-report.component';
import { MonthlyLineChartComponent } from './admin-reports/monthly-line-chart/monthly-line-chart.component';
import { MonthlyBarChartComponent } from './admin-reports/monthly-bar-chart/monthly-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    AdminReportsComponent,
    CartComponent,
    ShoppingHistoryComponent,
    AdminProductsComponent,
    ShopperProductsComponent,
    ProductComponent,
    SetProductDiscountComponent,
    ViewProductDiscountComponent,
    MonthlyReportComponent,
    QuarterlyReportComponent,
    DiscountTrendReportComponent,
    MonthlyLineChartComponent,
    MonthlyBarChartComponent
  ],
  imports: [
  BrowserModule,
    NgbModule,
    AppRoutingModule,   
    FormsModule,    
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    BsDatepickerModule.forRoot(),
    GoogleChartsModule,
  ],
  providers: [HttpClientModule, LocalDataService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }

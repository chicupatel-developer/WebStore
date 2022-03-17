using WebStore.Context.Models;
using System;
using System.Collections.Generic;
using System.Text;
using WebStore.Context.DTO;

namespace WebStore.Service.Interfaces
{
    public interface IAdminRepository
    {
        bool AddProductDiscount(ProductDiscount productDiscount);
        List<ProductDiscount> GetProductDiscountData(int productId);
        MonthlyProductSales GetMonthlyProductSales(MonthlyProductSales data);
        QuarterlyProductSales GetQuarterlyProductSales(QuarterlyProductSales data);
        DiscountZoneProductSales GetDiscountZoneProductSales(DiscountZoneProductSales data);
    }
}
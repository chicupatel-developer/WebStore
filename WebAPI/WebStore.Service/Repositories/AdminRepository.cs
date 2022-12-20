using System;
using System.Collections.Generic;
using System.Text;
using WebStore.Context;
using WebStore.Context.Models;
using WebStore.Service.Interfaces;
using System.Linq;
using WebStore.Service.Utils;
using WebStore.Context.DTO;
using System.Globalization;
using Microsoft.EntityFrameworkCore;

namespace WebStore.Service.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly WebStoreContext appDbContext;
        public AdminRepository(WebStoreContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public bool AddProductDiscount(ProductDiscount productDiscount)
        {
            // throw new Exception();

            bool retFlag = false;

            // check for 500 @ api controller
            // return false;

            var productDiscount_ = appDbContext.ProductDiscount
                                    .Where(x => x.FirstDateForDiscountedPrice.Year == productDiscount.FirstDateForDiscountedPrice.Year && x.FirstDateForDiscountedPrice.Month == productDiscount.FirstDateForDiscountedPrice.Month && x.ProductId==productDiscount.ProductId);
            if (productDiscount_ != null && productDiscount_.Count() > 0)
            {
                foreach (var pd in productDiscount_)
                {
                    if (productDiscount.FirstDateForDiscountedPrice.Date >= pd.FirstDateForDiscountedPrice.Date && productDiscount.FirstDateForDiscountedPrice.Date <= pd.LastDateForDiscountedPrice.Date)
                        throw new InvalidDiscountRange();
                    if (productDiscount.LastDateForDiscountedPrice.Date >= pd.FirstDateForDiscountedPrice.Date && productDiscount.LastDateForDiscountedPrice.Date <= pd.LastDateForDiscountedPrice.Date)
                        throw new InvalidDiscountRange();
                    if (productDiscount.FirstDateForDiscountedPrice.Date <= pd.FirstDateForDiscountedPrice && productDiscount.LastDateForDiscountedPrice.Date >= pd.LastDateForDiscountedPrice.Date)
                        throw new InvalidDiscountRange();
                }
            }

            appDbContext.ProductDiscount.Add(productDiscount);
            appDbContext.SaveChanges();
            retFlag = true;

            return retFlag;
        }

        public List<ProductDiscount> GetProductDiscountData(int productId)
        {
            List<ProductDiscount> datas = new List<ProductDiscount>();

            var datas_ = appDbContext.ProductDiscount
                            .Where(x => x.ProductId == productId)
                            .OrderByDescending(x=>x.FirstDateForDiscountedPrice);
            if (datas_ != null && datas_.Count() > 0)
                datas = datas_.ToList();

            return datas;
        }
    
    
        public MonthlyProductSales GetMonthlyProductSales(MonthlyProductSales data)
        {
            data.Months = new List<string>();
            data.Sales = new List<decimal>();        

            var productSoldData = appDbContext.ProductSold
                                    .Where(x => x.ProductId == data.ProductId && x.SoldDate.Year == data.Year);

            var groupedMonthly = (from p in productSoldData                          
                                 group p
                                   by new { month = p.SoldDate.Month} into d
                                 select new
                                 {
                                     Month = d.Key.month,
                                     TotalSales = d.Sum(x => (x.Qty*x.Price))
                                 }).ToList();

            var missingMonths = Enumerable
               .Range(1, 12)
               .Except(groupedMonthly.Select(m => m.Month));
            // Insert missing months back into months list
            foreach (var month in missingMonths)
            {
                groupedMonthly.Add(new 
                {
                    Month = month,
                    TotalSales = 0m
                });
            }

            foreach (var data_ in groupedMonthly.OrderBy(x=>x.Month))
            {
                data.Months.Add(GetMonthName(data_.Month));
                data.Sales.Add(data_.TotalSales);
            }
            return data;
        }

        public QuarterlyProductSales GetQuarterlyProductSales(QuarterlyProductSales data)
        {
            data.Quarters = new List<int>();
            data.Sales = new List<decimal>();

            var productSoldData = appDbContext.ProductSold
                                    .Where(x => x.ProductId == data.ProductId && x.SoldDate.Year == data.Year);

            var groupedQuarterly = (from p in productSoldData
                                  group p
                                    by new { quarter = (p.SoldDate.Month-1)/3 } into d
                                  select new
                                  {
                                      Quarter = d.Key.quarter+1,
                                      TotalSales = d.Sum(x => (x.Qty * x.Price))
                                      // TotalSales = d.Sum(x => (x.Qty))
                                  }).ToList();

            var missingQuarters = Enumerable
               .Range(1, 4)
               .Except(groupedQuarterly.Select(m => m.Quarter));
            foreach (var q in missingQuarters)
            {
                groupedQuarterly.Add(new
                {
                    Quarter = q,
                    TotalSales = 0.0m
                });
            }


            foreach (var data_ in groupedQuarterly.OrderBy(x => x.Quarter))
            {
                data.Quarters.Add(data_.Quarter);
                data.Sales.Add(data_.TotalSales);
            }
            return data;
        }

        public DiscountZoneProductSales GetDiscountZoneProductSales(DiscountZoneProductSales data)
        {
            var sales_ = appDbContext.ProductSold
                            .Where(x => x.ProductId == data.ProductId && x.SoldDate.Date >= data.DiscountStartDate.Date && x.SoldDate.Date <= data.DiscountEndDate.Date);

            if (sales_ != null && sales_.Count() > 0)
            {
                var totalSales = 0.0m;
                foreach(var sale_ in sales_)
                {
                    totalSales += (sale_.Price * sale_.Qty);
                }
                data.Sales = totalSales;
            }
            else
                data.Sales = 0.0m;
            return data;
        }

        public List<DiscountZoneProductSales> GetLast5DiscountZoneProductSales(DiscountZoneProductSales data)
        {
            List<DiscountZoneProductSales> datas = new List<DiscountZoneProductSales>();

            //var last5DisDatas = (from d in appDbContext.ProductDiscount
            //            where d.FirstDateForDiscountedPrice <= DateTime.Now && d.ProductId==data.ProductId
            //            orderby d.FirstDateForDiscountedPrice descending
            //            select d).Take(5);

            var last5DisDatas = (from d in appDbContext.ProductDiscount
                                 where d.FirstDateForDiscountedPrice.Date <= DateTime.Now.Date && d.ProductId == data.ProductId
                                 orderby d.FirstDateForDiscountedPrice descending
                                 select d).Take(5);

            if (last5DisDatas!=null && last5DisDatas.Count() > 0)
            {
                foreach(var disData in last5DisDatas)
                {
                    var sales_ = appDbContext.ProductSold
                          .Where(x => x.ProductId == data.ProductId && x.SoldDate.Date >= disData.FirstDateForDiscountedPrice.Date && x.SoldDate.Date <= disData.LastDateForDiscountedPrice.Date);
                    var totalSales = 0.0m;
                    if (sales_ != null && sales_.Count() > 0)
                    {
                        
                        foreach (var sale_ in sales_)
                        {
                            totalSales += (sale_.Price * sale_.Qty);
                        }                        
                    }

                    datas.Add(new DiscountZoneProductSales()
                    {
                         DiscountedPrice = disData.DiscountedPrice,
                          DiscountEndDate = disData.LastDateForDiscountedPrice,
                           DiscountPercentage =disData.DiscountPercentage,
                            DiscountStartDate =disData.FirstDateForDiscountedPrice,
                             Price = disData.Price,
                              ProductId = disData.ProductId,
                               Sales = totalSales
                    });
                }
            }
            return datas;
        }

        private static string GetMonthName(int monthNumber)
        {
            return CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(monthNumber);
        }

    }
}

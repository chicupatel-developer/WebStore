using System;
using System.Collections.Generic;
using System.Text;
using WebStore.Context;
using WebStore.Context.Models;
using WebStore.Service.Interfaces;
using System.Linq;
using WebStore.Service.Utils;
using WebStore.Context.DTO;

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
                            .Where(x => x.ProductId == productId);
            if (datas_ != null && datas_.Count() > 0)
                datas = datas_.ToList();

            return datas;
        }
    
    
        public MonthlyProductSales GetMonthlyProductSales(MonthlyProductSales data)
        {
            data.Months = new List<string>();
            data.Sales = new List<decimal>();

            data.Months.Add("January");
            data.Months.Add("February");
            data.Months.Add("March");

            data.Sales.Add(1000.50m);
            data.Sales.Add(2000.75m);
            data.Sales.Add(1500.55m);

            return data;
        }
    }
}

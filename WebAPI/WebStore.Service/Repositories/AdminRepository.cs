using System;
using System.Collections.Generic;
using System.Text;
using WebStore.Context;
using WebStore.Context.Models;
using WebStore.Service.Interfaces;
using System.Linq;
using WebStore.Service.Utils;


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

            var productDiscount_ = appDbContext.ProductDiscount
                                    .Where(x => x.FirstDateForDiscountedPrice.Year == productDiscount.FirstDateForDiscountedPrice.Year && x.FirstDateForDiscountedPrice.Month == productDiscount.FirstDateForDiscountedPrice.Month);
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
    }
}

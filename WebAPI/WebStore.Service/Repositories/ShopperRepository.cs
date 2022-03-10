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
    public class ShopperRepository : IShopperRepository
    {
        private readonly WebStoreContext appDbContext;
        public ShopperRepository(WebStoreContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public bool AddProductSold(List<ProductSold> productSold)
        {
            // throw new NotImplementedException();            

            using var transaction = appDbContext.Database.BeginTransaction();
            try
            {
                // throw new Exception();

                foreach (var product in productSold)
                {
                    appDbContext.ProductSold.Add(product);
                    appDbContext.SaveChanges();
                }
                transaction.Commit();
                return true;
            }
            catch(Exception ex)
            {
                transaction.Rollback();
                return false;
            }            
        }

        public List<ProductSold> GetTodayHistory(string userName)
        {
            List<ProductSold> products = new List<ProductSold>();

            var products_ = appDbContext.ProductSold
                                .Where(x => x.SoldDate.Date == DateTime.Now.Date && x.UserName==userName);
            if(products_!=null && products_.Count() > 0)
            {
                products = products_.ToList();
            }
            return products;
        }

        public List<ProductSold> GetCurrentWeekHistory(string userName)
        {
            List<ProductSold> products = new List<ProductSold>();

            DateTime date = DateTime.Today;
            DateTime firstDayOfWeek = DateTimeExt.GetFirstDayOfWeek(date);
            DateTime lastDayOfWeek = DateTimeExt.GetLasttDayOfWeek(date);

            var products_ = appDbContext.ProductSold
                                .Where(x => x.SoldDate.Date >= firstDayOfWeek.Date && x.SoldDate <= lastDayOfWeek.Date && x.UserName == userName);
            if (products_ != null && products_.Count() > 0)
            {
                products = products_.ToList();
            }
            return products;
        }

        public List<ProductSold> GetCurrentMonthHistory(string userName)
        {
            List<ProductSold> products = new List<ProductSold>();

            DateTime date = DateTime.Today;

            int currentMonth = DateTime.Now.Month;
            int currentYear = DateTime.Now.Year;

            var products_ = appDbContext.ProductSold
                                .Where(x => x.SoldDate.Month == currentMonth  && x.SoldDate.Year == currentYear && x.UserName == userName);
            {
                products = products_.ToList();
            }
            return products;
        }

        public List<DiscountData> GetProductDiscountData(string userName)
        {
            List<DiscountData> discountDatas = new List<DiscountData>();

            DateTime currentDate = DateTime.Now;
            DateTime eligibleStartDate = currentDate.AddDays(-30);


            // check discount data from ProductDiscount
            var productDiscount = appDbContext.ProductDiscount
                                                .Where(x => currentDate >= x.FirstDateForDiscountedPrice && currentDate <= x.LastDateForDiscountedPrice);
            if (productDiscount != null && productDiscount.Count() > 0)
            {
                foreach (var productDis in productDiscount)
                {
                    int productId = productDis.ProductId;

                    // check in ProductSold for given UserName and this productId
                    var productSold = appDbContext.ProductSold
                                        .Where(y => y.ProductId == productId && y.UserName == userName && y.SoldDate >= eligibleStartDate && y.SoldDate <= currentDate);
                    if (productSold != null && productSold.Count() > 0)
                    {
                        int totalQty = 0;
                        foreach (var productSold_ in productSold)
                        {
                            totalQty += productSold_.Qty;
                        }
                        if (productDis.DiscountQty <= totalQty)
                        {
                            // discount is approved for this UserName and ProductId
                            discountDatas.Add(new DiscountData()
                            {
                                ProductDiscountId = productDis.ProductDiscountId,
                                DiscountedPrice = productDis.DiscountedPrice,
                                DiscountEndDate = productDis.LastDateForDiscountedPrice,
                                DiscountStartDate = productDis.FirstDateForDiscountedPrice,
                                DiscountQty = productDis.DiscountQty,
                                Price = productDis.Price,
                                ProductId = productDis.ProductId,
                                UserName = userName,
                                UserBoughtQtySoFar = totalQty,
                            });
                        }
                    }
                }
            }
            return discountDatas;
        }
    }
}

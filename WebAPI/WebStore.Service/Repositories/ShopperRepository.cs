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
    }
}

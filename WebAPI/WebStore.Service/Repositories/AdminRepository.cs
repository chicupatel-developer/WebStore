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
            try
            {
                // throw new Exception();

                appDbContext.ProductDiscount.Add(productDiscount);
                appDbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}

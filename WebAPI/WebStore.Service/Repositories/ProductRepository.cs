using System;
using System.Collections.Generic;
using System.Text;
using WebStore.Context;
using WebStore.Context.Models;
using WebStore.Service.Interfaces;

namespace WebStore.Service.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly WebStoreContext appDbContext;
        public ProductRepository(WebStoreContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public bool AddProductSold(List<ProductSold> productSold)
        {
            // throw new NotImplementedException();

            using var transaction = appDbContext.Database.BeginTransaction();
            try
            {
                foreach(var product in productSold)
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
    }
}

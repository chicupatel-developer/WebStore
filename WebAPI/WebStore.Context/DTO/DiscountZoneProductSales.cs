using System;
using System.Collections.Generic;
using System.Text;

namespace WebStore.Context.DTO
{
    public class DiscountZoneProductSales
    {
        public int ProductId { get; set; }
        public DateTime DiscountStartDate { get; set; }
        public DateTime DiscountEndDate { get; set; }
        public int DiscountPercentage { get; set; }
        public decimal DiscountedPrice { get; set; }
        public decimal Price { get; set; }
        public decimal Sales { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace WebStore.Context.DTO
{
    public class DiscountData
    {
        public int ProductDiscountId { get; set; }
        public string UserName { get; set; }
        public int ProductId { get; set; }
        public decimal Price { get; set; }
        public decimal DiscountedPrice { get; set; }
        public DateTime DiscountStartDate { get; set; }
        public DateTime DiscountEndDate { get; set; }
        public int DiscountQty { get; set; }
        public int UserBoughtQtySoFar { get; set; }
        
    }
}

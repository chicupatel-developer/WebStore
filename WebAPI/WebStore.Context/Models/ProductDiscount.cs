using System;
using System.Collections.Generic;
using System.Text;

namespace WebStore.Context.Models
{
    public class ProductDiscount
    {
        public int ProductDiscountId { get; set; }
        public int ProductId { get; set; }
        public decimal Price { get; set; }
        public decimal DiscountedPrice { get; set; }
        public int DiscountPercentage { get; set; }

        // this will decide if discount is given on particular product or not
        // if(User has bought 10 or more Qty for this product in last 30 days then apply discount 10%)
        public int DiscountQty { get; set; }


        public DateTime FirstDateForDiscountedPrice { get; set; }
        public DateTime LastDateForDiscountedPrice { get; set; }
    }
}

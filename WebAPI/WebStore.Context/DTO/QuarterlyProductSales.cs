using System;
using System.Collections.Generic;
using System.Text;

namespace WebStore.Context.DTO
{
    public class QuarterlyProductSales
    {
        public int ProductId { get; set; }
        public int Year { get; set; }
        public List<int> Quarters { get; set; }
        public List<decimal> Sales { get; set; }
    }
}

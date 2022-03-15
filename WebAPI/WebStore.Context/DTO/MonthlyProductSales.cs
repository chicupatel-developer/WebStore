using System;
using System.Collections.Generic;
using System.Text;

namespace WebStore.Context.DTO
{
    public class MonthlyProductSales
    {
        public int ProductId { get; set; }
        public int Year { get; set; }
        public List<string> Months { get; set; }
        public List<decimal> Sales { get; set; }
    }
}

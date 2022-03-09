using System;
using System.Collections.Generic;
using System.Text;

namespace WebStore.Service.Utils
{
    public class InvalidDiscountRange : Exception
    {
        public InvalidDiscountRange() { }       

        //Overriding the Message property
        public override string Message
        {
            get
            {
                return "Discount Is Already Set For This Date Range!";
            }
        }
    }
}

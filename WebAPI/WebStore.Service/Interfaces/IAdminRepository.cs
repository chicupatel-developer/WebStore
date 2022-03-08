using WebStore.Context.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace WebStore.Service.Interfaces
{
    public interface IAdminRepository
    {
        bool AddProductDiscount(ProductDiscount productDiscount);       
    }
}
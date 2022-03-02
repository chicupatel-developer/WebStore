using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebStore.Context.Models;
using WebStore.Service.Interfaces;

namespace WebStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepo;

        public ProductController(IProductRepository productRepo)
        {
            _productRepo = productRepo;
        }

        // [Authorize("Admin")]
        [HttpPost]
        [Route("addProductSold")]
        public IActionResult AddProductSold(List<ProductSold> productSold)
        {
            try
            {
                // check for exception,,, 400
                // throw new Exception();

                _productRepo.AddProductSold(productSold);
                return Ok("Sold Product Added To Database Successfully !");
               
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

    }
}

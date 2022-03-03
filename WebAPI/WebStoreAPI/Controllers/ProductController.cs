using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebStore.Context.AuthDTO;
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
            var response = new Response();
            try
            {
                // check for exception,,, 400
                // throw new Exception();


                // check for ModeState
                // ModelState.AddModelError("UserName", "UserName is Required!");

                if (ModelState.IsValid)
                {
                    if (_productRepo.AddProductSold(productSold))
                        return Ok("Sold Product Added To Database Successfully !");
                    else
                        return StatusCode(StatusCodes.Status500InternalServerError, new Response { ResponseCode = 500, ResponseMessage = "Server Error !" });
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                response.ResponseCode = 400;
                response.ResponseMessage = "Bad Request !";
                return BadRequest(new
                {
                    response = response,
                });
            }
        }

    }
}

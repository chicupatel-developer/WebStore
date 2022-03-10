using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebStore.Context.DTO;
using WebStore.Context.Models;
using WebStore.Service.Interfaces;

namespace WebStoreAPI.Controllers
{
    // [Authorize("Shopper")]
    [Route("api/[controller]")]
    [ApiController]
    public class ShopperController : ControllerBase
    {
        private readonly IShopperRepository _shopperRepo;

        public ShopperController(IShopperRepository shopperRepo)
        {
            _shopperRepo = shopperRepo;
        }

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
                    if (_shopperRepo.AddProductSold(productSold))
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


        // https://localhost:44309/api/Shopper/getTodayHistory?userName=haha
        [HttpGet]
        [Route("getTodayHistory")]
        public IActionResult GetTodayHistory(string userName)
        {
            try
            {                
                var products = _shopperRepo.GetTodayHistory(userName);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        // https://localhost:44309/api/Shopper/getCurrentWeekHistory?userName=haha
        [HttpGet]
        [Route("getCurrentWeekHistory")]
        public IActionResult GetCurrentWeekHistory(string userName)
        {
            try
            {
                var products = _shopperRepo.GetCurrentWeekHistory(userName);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        // https://localhost:44309/api/Shopper/getCurrentMonthHistory?userName=haha
        [HttpGet]
        [Route("getCurrentMonthHistory")]
        public IActionResult GetCurrentMonthHistory(string userName)
        {
            try
            {
                var products = _shopperRepo.GetCurrentMonthHistory(userName);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }



        // https://localhost:44309/api/Shopper/getProductDiscountData?userName=haha
        [HttpGet]
        [Route("getProductDiscountData")]
        public IActionResult GetProductDiscountData(string userName)
        {
            try
            {
                var discountDatas = _shopperRepo.GetProductDiscountData(userName);
                return Ok(discountDatas);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }


    }
}

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
using WebStore.Service.Utils;

namespace WebStoreAPI.Controllers
{
    // [Authorize("Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepo;

        public AdminController(IAdminRepository adminRepo)
        {
            _adminRepo = adminRepo;
        }

        [HttpPost]
        [Route("addProductDiscount")]
        public IActionResult AddProductDiscount(ProductDiscount productDiscount)
        {
            var response = new Response();
            try
            {
                // check for exception,,, 400
                // throw new Exception();


                // check for ModeState
                // ModelState.AddModelError("ProductId", "Product Id is Required!");

                if (ModelState.IsValid)
                {
                    if (_adminRepo.AddProductDiscount(productDiscount))
                        return Ok("Product Discount Applied Successfully !");
                    else
                        return StatusCode(StatusCodes.Status500InternalServerError, new Response { ResponseCode = 500, ResponseMessage = "Server Error !" });
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (InvalidDiscountRange ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { ResponseCode = 500, ResponseMessage = ex.Message });
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


        // https://localhost:44309/api/Admin/getProductDiscountData?productId=1
        [HttpGet]
        [Route("getProductDiscountData")]
        public IActionResult GetProductDiscountData(int productId)
        {
            try
            {
                var discountDatas = _adminRepo.GetProductDiscountData(productId);
                return Ok(discountDatas);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        // https://localhost:44309/api/Admin/getMonthlyProductSales
        [HttpPost]
        [Route("getMonthlyProductSales")]
        public IActionResult GetMonthlyProductSales(MonthlyProductSales data)
        {
            try
            {
                var monthlySalesData = _adminRepo.GetMonthlyProductSales(data);
                return Ok(monthlySalesData);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }


        // https://localhost:44309/api/Admin/getQuarterlyProductSales
        [HttpPost]
        [Route("getQuarterlyProductSales")]
        public IActionResult GetQuarterlyProductSales(QuarterlyProductSales data)
        {
            try
            {
                var quarterlySalesData = _adminRepo.GetQuarterlyProductSales(data);
                return Ok(quarterlySalesData);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

    }
}

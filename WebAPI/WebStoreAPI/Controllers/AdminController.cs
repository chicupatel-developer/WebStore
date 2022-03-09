﻿using Microsoft.AspNetCore.Authorization;
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
      
    }
}

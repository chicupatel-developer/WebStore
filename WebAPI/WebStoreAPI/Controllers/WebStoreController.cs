using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebStoreAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WebStoreController : ControllerBase
    {     
        private readonly ILogger<WebStoreController> _logger;

        public WebStoreController(ILogger<WebStoreController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public string Get()
        {
            return "Welcome To WebStore App !" + "\n" + "This App requires Fake-Store-API(https://fakestoreapi.com/) to access Products !";
        }
    }
}

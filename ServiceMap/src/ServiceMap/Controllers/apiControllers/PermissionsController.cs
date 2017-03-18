using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ServiceMap.Models;
using Microsoft.Extensions.Configuration;
// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ServiceMap.Controllers.apiControllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class PermissionsController : Controller
    {
        IConfiguration _configuration;


        public PermissionsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            bool issuperuser = false;

            if (User.IsInRole(_configuration["Data:Roles:Superuser"]))
            {
                issuperuser = true;
            }

            return Ok(issuperuser);
        }

    }
}

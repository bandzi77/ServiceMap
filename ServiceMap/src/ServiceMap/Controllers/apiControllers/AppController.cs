using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ServiceMap.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using ServiceMap.Models.apiModels;
// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ServiceMap.Controllers.apiControllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class AppController : Controller
    {
        IConfiguration configuration;
        private SignInManager<AppUser> signInManager;       

        public AppController(IConfiguration config, SignInManager<AppUser> signinMgr)
        {
            configuration = config;
            signInManager = signinMgr;
        }

        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            bool issuperuser = false;

            if (User.IsInRole(configuration["Data:Roles:Superuser"]))
            {
                issuperuser = true;
            }
            return Ok(issuperuser);
        }
    }
}

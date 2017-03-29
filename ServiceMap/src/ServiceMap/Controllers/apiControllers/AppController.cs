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
        IConfiguration _configuration;
        private SignInManager<AppUser> signInManager;       

        public AppController(IConfiguration configuration, SignInManager<AppUser> signinMgr)
        {
            _configuration = configuration;
            signInManager = signinMgr;
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

        // TODO na POST i redirect przygotować
        [Authorize]
        //[ValidateAntiForgeryToken]
        [HttpGet("GetLogout")]
        public async Task<IActionResult> GetLogout()
        {
            await signInManager.SignOutAsync();

            return Ok(new {succes= true });
            //return RedirectToAction("Index", "Home");
        }
    }
}

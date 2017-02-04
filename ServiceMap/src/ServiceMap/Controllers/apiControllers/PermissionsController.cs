using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ServiceMap.Models;
// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ServiceMap.Controllers.apiControllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class PermissionsController : Controller
    {
        private IEnvironments _environments;

 
        public PermissionsController(IEnvironments environments)
        {
            _environments = environments;
        }

        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            bool issuperuser = false;

            if (User.IsInRole(_environments.roleSuperuser))
            {
                issuperuser = true;
            }

            return Ok(issuperuser);
        }

    }
}

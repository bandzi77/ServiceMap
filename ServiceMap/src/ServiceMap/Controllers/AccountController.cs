using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ServiceMap.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ServiceMap.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        // GET: /<controller>/
        [AllowAnonymous]
        public IActionResult Login(string returnUrl)
        {
            ViewBag.retrunUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginModel details, string returnUrl)
        {
            return View(details);
        }
    }
}

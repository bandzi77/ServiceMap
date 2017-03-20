using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ServiceMap.Models;
using Microsoft.AspNetCore.Identity;
using ServiceMap.Models.apiModels;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ServiceMap.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private UserManager<AppUser> userManager;
        private SignInManager<AppUser> signInManager;

        public AccountController(UserManager<AppUser> userMgr,
                SignInManager<AppUser> signinMgr)
        {
            userManager = userMgr;
            signInManager = signinMgr;
        }

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
        public async Task<IActionResult> Login(LoginModel details,
                 string returnUrl)
        {
            if (ModelState.IsValid)
            {
                AppUser user = await userManager.FindByEmailAsync(details.Email);
               var list= userManager.Users.ToAsyncEnumerable();
                if (user != null)
                {
                    await signInManager.SignOutAsync();
                    Microsoft.AspNetCore.Identity.SignInResult result =
                        await signInManager.PasswordSignInAsync(user, details.Password, false, true);

                    if (result.Succeeded)
                    {
                        return Redirect(returnUrl ?? "/");
                    }
                    else
                    {// odblokowanie konta
                        await userManager.SetLockoutEndDateAsync(user, DateTime.Now);
                    }
                }
                ModelState.AddModelError(nameof(LoginModel.Email),"Niepoprawny email lub hasło");
            }
            return View(details);
        }

        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

        [AllowAnonymous]
        public IActionResult AccessDenied()
        {
            return View();
        }



        //public virtual async Task<identityresult> LockUserAccount(string userId, int? forDays)
        //{
        //    var result = await this.SetLockoutEnabledAsync(userId, true);
        //    if (result.Succeeded)
        //    {
        //        if (forDays.HasValue)
        //        {
        //            result = await SetLockoutEndDateAsync(userId, DateTimeOffset.UtcNow.AddDays(forDays.Value));
        //        }
        //        else
        //        {
        //            result = await SetLockoutEndDateAsync(userId, DateTimeOffset.MaxValue);
        //        }
        //    }
        //    return result;
        //}
        //public virtual async Task<identityresult> UnlockUserAccount(string userId)
        //{
        //    var result = await this.SetLockoutEnabledAsync(userId, false);
        //    if (result.Succeeded)
        //    {
        //        await ResetAccessFailedCountAsync(userId);
        //    }
        //    return result;
        //}




    }
}

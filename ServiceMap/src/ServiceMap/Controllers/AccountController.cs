using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ServiceMap.Models;
using Microsoft.AspNetCore.Identity;
using ServiceMap.Models.apiModels;
using ServiceMap.Common;
using System.ComponentModel.DataAnnotations;


// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ServiceMap.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private UserManager<AppUser> userManager;
        private SignInManager<AppUser> signInManager;
        private IUserService currentUser;
        private IEmailService emailService;

        public AccountController(UserManager<AppUser> userMgr, SignInManager<AppUser> signinMgr, IUserService userService, IEmailService emailService)
        {
            userManager = userMgr;
            signInManager = signinMgr;
            currentUser = userService;
            this.emailService = emailService;
        }

        [AllowAnonymous]
        public IActionResult ForgotPassword()
        {
            return View();
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("ResetPassword")]
        public IActionResult LinkResetPassword(ResetPasswordModel model)
        {
            ModelState.Clear();
            return View(model);
        }


        [AllowAnonymous]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                if (model.Password != model.ConfirmPassword)
                {
                    ModelState.AddModelError("Password", ConstsData.DifferencesPasswordMsg);
                    return View(model);
                }

                var user = await userManager.FindByEmailAsync(model.Email.ToUpper());

                if (user != null)
                {
                    var resetResult = await userManager.ResetPasswordAsync(user, model.Token, model.Password);
                    if (!resetResult.Succeeded)
                    {
                        ModelState.AddModelError("email", ConstsData.ResetLinkWrongToken);
                        return View(model);
                    }
                }

                if (user == null)
                {
                    ModelState.AddModelError("email", ConstsData.ResetLinkWrongEmail);
                    return View(model);
                }

                return RedirectToAction("Login", "Account");
            }

            return View(model);
        }

        [AllowAnonymous]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            //TODO

            if (ModelState.IsValid)
            {
                var user = await userManager.FindByEmailAsync(email.ToUpper());
                if (user != null)
                {
                    //var fromEmail = currentUser.GetUser(User).Result.NormalizedEmail;

                    // Send an email with this linkuserId = user.Id,
                    var token = await userManager.GeneratePasswordResetTokenAsync(user);
                    var callbackUrl = Url.Action(nameof(ResetPassword), "Account", new { email = email.ToUpper(), token = token }, protocol: HttpContext.Request.Scheme);
                    //await _emailSender.SendEmailAsync(model.Email, "Reset Password",
                    //   $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");
                    //   return View("ForgotPasswordConfirmation"); < a href = '{callbackUrl}' > link </ a >

                    await emailService.SendEmailAsync("No replay", email, ConstsData.ResetLinkPasswordSubject, ConstsData.ResetLinkPasswordMsg + $"{callbackUrl}");
                }
            }
            string message = $"Na wskazany adres email \"{email}\" został wysłany link pozwalający na zresetowanie hasła";
            return RedirectToAction("InfoPanel", "Account", new { message });
        }


        [AllowAnonymous]
        public IActionResult InfoPanel(string message)
        {
            ViewBag.Message = message;
            return View();
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
        public async Task<IActionResult> Login(LoginModel details, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                AppUser user = await userManager.FindByEmailAsync(details.Email);
                var list = userManager.Users.ToAsyncEnumerable();

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
                ModelState.AddModelError(nameof(LoginModel.Email), "Niepoprawny adres email lub hasło");
            }
            return View(details);
        }


        [AllowAnonymous]
        public IActionResult AccessDenied()
        {
            return View();
        }

        // POST: /Account/ForgotPassword
        //[HttpPost]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var user = await _userManager.FindByEmailAsync(model.Email);
        //        if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
        //        {
        //            // Don't reveal that the user does not exist or is not confirmed.
        //            return View("ForgotPasswordConfirmation");
        //        }

        //        // Send an email with this link
        //        var code = await _userManager.GeneratePasswordResetTokenAsync(user);
        //        var callbackUrl = Url.Action(nameof(ResetPassword), "Account",
        //            new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
        //        await _emailSender.SendEmailAsync(model.Email, "Reset Password",
        //           $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");
        //        return View("ForgotPasswordConfirmation");
        //    }

        //    // If we got this far, something failed, redisplay form
        //    return View(model);
        //}

        //public async Task<IActionResult> Logout()
        //{
        //    await signInManager.SignOutAsync();
        //    return RedirectToAction("Index", "Home");
        //}


        //[HttpPost]
        //[Authorize]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Logout()
        //{
        //    await signInManager.SignOutAsync();
        //    return RedirectToAction("Index", "Home");
        //}

        // POST: /Account/LogOff
        //[HttpPost]
        //public ActionResult LogOff()
        //{
        //    AuthenticationManager.SignOut();
        //    return RedirectToAction("Index", "Home");
        //}
        //

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

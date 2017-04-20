using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServiceMap.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using ServiceMap.Models.apiModels;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ServiceMap.Common;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860
//UserManager<AppUser> userMgr, RoleManager<IdentityRole> roleMgr 
namespace ServiceMap.Controllers.apiControllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "Superusers")]
    public class UsersController : Controller
    {
        private SignInManager<AppUser> signInManager;
        private UserManager<AppUser> userManager;
        private RoleManager<IdentityRole> roleManager;
        private IConfiguration _configuration;
        private string roleSuperUser;
        private string roleUser;
        private IEmailService emailService;
        private IUserService currentUser;

        public UsersController(SignInManager<AppUser> signinMgr, UserManager<AppUser> userMgr,
            RoleManager<IdentityRole> roleMgr, IConfiguration configuration, IEmailService emailService, IUserService userService)
        {
            signInManager = signinMgr;
            userManager = userMgr;
            roleManager = roleMgr;
            _configuration = configuration;
            this.emailService = emailService;
            this.currentUser = userService;
            roleSuperUser = configuration["Data:Roles:Superuser"];
            roleUser = configuration["Data:Roles:User"];
        }


        // GET: api/values
        [HttpGet]
        public async Task<IActionResult> Get(string email, bool showLockedOnly)
        {
            IQueryable<AppUser> _users = null;

            var userRole = await roleManager.FindByNameAsync(roleSuperUser);

            if (!String.IsNullOrWhiteSpace(email))
            {
                _users = userManager.Users.Where(x => x.NormalizedEmail.StartsWith(email.ToUpper()));
            }
            else
            {
                _users = userManager.Users;
            }

            var _result = _users
                .Select(x => new User()
                {
                    _id = x.Id,
                    Email = x.Email,
                    LimitOfRequestsPerDay = x.LimitOfRequestsPerDay,
                    NumberOfRequestsPerDay = x.NumberOfRequestsPerDay,
                    IsSuperUser = x.Roles.Any(y => y.RoleId == userRole.Id),
                    IsLocked = x.LockoutEnd > DateTime.Now && x.LockoutEnabled
                }).AsQueryable();

            if (showLockedOnly)
            {
                _result = _result.Where(x => x.IsLocked == showLockedOnly);
            }
            var t = _result.OrderBy(x => x.Email).ToList();
            t.AddRange(t);
            t.AddRange(t);
            t.AddRange(t);
            var result = new { users = t, paging = "" };
            return Ok(result);
        }

        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user)
        {
            IdentityResult resultIdent = null;

            var result = new { success = false, message = ConstsData.UserModelInvalid };

            if (ModelState.IsValid && user._id == "0")
            {
                if (await userManager.FindByEmailAsync(user.Email.ToUpper()) == null)
                {

                    if (await roleManager.FindByNameAsync(roleSuperUser) == null)
                    {
                        resultIdent = await roleManager.CreateAsync(new IdentityRole(roleSuperUser));
                    }

                    if (await roleManager.FindByNameAsync(roleUser) == null)
                    {
                        resultIdent = await roleManager.CreateAsync(new IdentityRole(roleUser));
                    }

                    if (resultIdent != null && !resultIdent.Succeeded)
                    {
                        result = new { success = false, message = ConstsData.UserCreateAnotherError };
                        return Ok(result);
                    }

                    AppUser newUser = new AppUser
                    {
                        UserName = user.Email.ToUpper(),
                        Email = user.Email.ToUpper(),
                        AccessFailedCount = 5,
                        LockoutEnd = user.IsLocked ? DateTimeOffset.MaxValue : (DateTimeOffset?)null,
                        LimitOfRequestsPerDay = user.LimitOfRequestsPerDay,
                        NumberOfRequestsPerDay = user.NumberOfRequestsPerDay
                    };

                    resultIdent = await userManager.CreateAsync(newUser, user.Password);

                    if (resultIdent.Succeeded)
                    {
                        if (user.IsSuperUser)
                        {
                            resultIdent = await userManager.AddToRoleAsync(newUser, roleSuperUser);
                        }
                        else
                        {
                            resultIdent = await userManager.AddToRoleAsync(newUser, roleUser);
                        }

                        if (resultIdent.Succeeded)
                        {
                            SendPasswordToUser(user);
                            result = new { success = true, message = ConstsData.UserCreateSuccess };
                        }
                        else
                        {
                            await userManager.DeleteAsync(newUser);
                            result = new { success = false, message = ConstsData.UserCreateAnotherError };
                        }
                    }
                    else
                    {
                        result = new { success = false, message = ConstsData.UserCreateIdentityError };
                    }
                }
                else
                {
                    result = new { success = false, message = ConstsData.UserAlreadyExists };
                }
            }

           return Ok(result);
        }

        private void SendPasswordToUser(User newUser)
        {
            var fromEmail = currentUser.GetUser(User).Result.NormalizedEmail;
            
            emailService.SendEmailAsync("TNT SM", "mariusz-hyla@wp.pl", newUser.Email, 
                ConstsData.PasswordForNewUserSubject, 
                ConstsData.PasswordForNewUserMsg + $"{newUser.Password}" +
                ConstsData.PasswordForNewUserQueryLimit + $"{newUser.LimitOfRequestsPerDay}");
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] User user)
        {
            IdentityResult resultIdent = null;
            var result = new { success = false, message = ConstsData.UpdateUserError };

            ModelState.Remove("Password");
            if (ModelState.IsValid && user._id != "0")
            {
                var userToUpdate = await userManager.FindByIdAsync(id);
                if (userToUpdate != null)
                {
                    userToUpdate.LimitOfRequestsPerDay = user.LimitOfRequestsPerDay;
                    userToUpdate.LockoutEnd = user.IsLocked ? DateTimeOffset.MaxValue : (DateTimeOffset?)null;
                    resultIdent = await userManager.UpdateAsync(userToUpdate);
                    if (resultIdent.Succeeded)
                    {
                        if (!user.IsLocked)
                        {
                            resultIdent = await userManager.ResetAccessFailedCountAsync(userToUpdate);
                        }

                        if (resultIdent.Succeeded)
                        {
                            if (await userManager.IsInRoleAsync(userToUpdate, roleSuperUser) && user.IsSuperUser)
                            {
                                result = new { success = true, message = ConstsData.UpdateUserSuccess };
                            }
                            else
                            {
                                dynamic res = await UserUpdateRole(userToUpdate, user);
                                result = new { success = (bool)res.success, message = (string)res.message };
                            }
                        }
                        else
                        {
                            result = new { success = false, message = ConstsData.UpdateUserResetAccessFailed };
                        }
                    }
                    else
                    {
                        result = new { success = false, message = ConstsData.UpdateUserIdentity };
                    }
                }
                else
                {
                    result = new { success = false, message = ConstsData.UpdateUserNotExists };
                }
            }

            return Ok(result);
        }


        private async Task<Object> UserUpdateRole(AppUser appUser, User user)
        {
            string roleToRemove = user.IsSuperUser ? roleUser : roleSuperUser;
            string roleToSet = user.IsSuperUser ? roleSuperUser : roleUser;

            IdentityResult resultIdent = null;

            if (await userManager.IsInRoleAsync(appUser, roleToRemove))
            {
                resultIdent = await userManager.RemoveFromRoleAsync(appUser, roleToRemove);
            }

            if (!await userManager.IsInRoleAsync(appUser, roleToSet))
            {
                resultIdent = await userManager.AddToRoleAsync(appUser, roleToSet);
            }


            if (resultIdent == null || resultIdent.Succeeded)
            {
                return new { success = true, message = ConstsData.UpdateUserSuccess };
            }
            else
            {
                return new { success = false, message = ConstsData.UpdateUserRoleIdentity };
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            IdentityResult resultIdent = null;
            var result = new { success = false, message = ConstsData.DeleteUserError };

            if (id != "0")
            {
                var user = await userManager.FindByIdAsync(id);
                if (user != null)
                {
                    resultIdent = await userManager.DeleteAsync(user);
                    if (resultIdent.Succeeded)
                    {
                        result = new { success = true, message = ConstsData.DeleteUserSuccess };
                    }
                }
            }

            return Ok(result);
        }
    }
}

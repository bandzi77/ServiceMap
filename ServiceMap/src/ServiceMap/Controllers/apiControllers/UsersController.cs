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

        public UsersController(SignInManager<AppUser> signinMgr, UserManager<AppUser> userMgr, RoleManager<IdentityRole> roleMgr, IConfiguration configuration)
        {
            signInManager = signinMgr;
            userManager = userMgr;
            roleManager = roleMgr;
            _configuration = configuration;
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
            IdentityResult result = null;

            var result_ = new { success = false, message = ConstsData.UserModelInvalid };

            if (ModelState.IsValid && user._id == "0")
            {
                if (await userManager.FindByEmailAsync(user.Email.ToUpper()) == null)
                {

                    if (await roleManager.FindByNameAsync(roleSuperUser) == null)
                    {
                        result = await roleManager.CreateAsync(new IdentityRole(roleSuperUser));

                    }

                    if (await roleManager.FindByNameAsync(roleUser) == null)
                    {
                        result = await roleManager.CreateAsync(new IdentityRole(roleUser));
                    }

                    if (result != null && !result.Succeeded)
                    {
                        result_ = new { success = false, message = ConstsData.UserCreateAnotherError };
                        return Ok(result_);
                    }

                    AppUser new_user = new AppUser
                    {
                        UserName = user.Email.ToUpper(),
                        Email = user.Email.ToUpper(),
                        AccessFailedCount = 5,
                        LockoutEnd = user.IsLocked ? DateTimeOffset.MaxValue : (DateTimeOffset?)null,
                        LimitOfRequestsPerDay = user.LimitOfRequestsPerDay,
                        NumberOfRequestsPerDay = user.NumberOfRequestsPerDay
                    };

                    result = await userManager.CreateAsync(new_user, user.Password);

                    if (result.Succeeded)
                    {
                        if (user.IsSuperUser)
                        {
                            result = await userManager.AddToRoleAsync(new_user, roleSuperUser);
                        }
                        else
                        {
                            result = await userManager.AddToRoleAsync(new_user, roleUser);
                        }

                        if (result.Succeeded)
                        {
                            result_ = new { success = true, message = ConstsData.UserCreateSuccess };
                        }
                        else
                        {
                            await userManager.DeleteAsync(new_user);
                            result_ = new { success = false, message = ConstsData.UserCreateAnotherError };
                        }
                    }
                    else
                    {
                        result_ = new { success = false, message = ConstsData.UserCreateIdentityError };
                    }
                }
                else
                {
                    result_ = new { success = false, message = ConstsData.UserAlreadyExists };
                }
            }

            return Ok(result_);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task Put(string id, [FromBody] User user)
        {
            ModelState.Remove("Password");
            if (ModelState.IsValid && user._id != "0")
            {
                var _oldUser = await userManager.FindByIdAsync(id);
                if (_oldUser != null)
                {
                    _oldUser.LimitOfRequestsPerDay = user.LimitOfRequestsPerDay;
                    _oldUser.LockoutEnd = user.IsLocked ? DateTimeOffset.MaxValue : (DateTimeOffset?)null;
                    await userManager.UpdateAsync(_oldUser);

                    if (!user.IsLocked)
                    {
                        await userManager.ResetAccessFailedCountAsync(_oldUser);
                    }

                    var role = await roleManager.FindByNameAsync(roleSuperUser);
                    if (await userManager.IsInRoleAsync(_oldUser, role.Name) && !user.IsSuperUser)
                    {
                        await userManager.RemoveFromRoleAsync(_oldUser, role.Name);

                        var userRole = await roleManager.FindByNameAsync(roleUser);
                        if (!await userManager.IsInRoleAsync(_oldUser, userRole.Name))
                        {
                            await userManager.AddToRoleAsync(_oldUser, userRole.Name);
                        }
                        return;
                    }

                    role = await roleManager.FindByNameAsync(roleUser);
                    if (await userManager.IsInRoleAsync(_oldUser, role.Name) && user.IsSuperUser)
                    {
                        await userManager.RemoveFromRoleAsync(_oldUser, role.Name);

                        var userRole = await roleManager.FindByNameAsync(roleSuperUser);
                        if (!await userManager.IsInRoleAsync(_oldUser, userRole.Name))
                        {
                            await userManager.AddToRoleAsync(_oldUser, userRole.Name);
                        }
                        return;
                    }
                }

            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            if (id != "0")
            {
                var user = await userManager.FindByIdAsync(id);
                if (user != null)
                {
                    await userManager.DeleteAsync(user);
                }
            }
        }
    }
}

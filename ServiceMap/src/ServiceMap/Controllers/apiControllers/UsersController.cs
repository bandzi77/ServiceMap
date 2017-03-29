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
            });

            if (showLockedOnly)
            {
                _result= _result.Where(x => x.IsLocked == showLockedOnly);
            }
            _result = _result.OrderBy(x => x.Email);

            var result = new { users = _result, paging = "" };
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
        public async Task<bool> Post([FromBody] User user)
        {
            bool _result = false;
            if (ModelState.IsValid && user._id == "0")
            {

                if (await userManager.FindByEmailAsync(user.Email.ToUpper()) == null)
                {
                    if (await roleManager.FindByNameAsync(roleSuperUser) == null)
                    {
                        await roleManager.CreateAsync(new IdentityRole(roleSuperUser));

                    }

                    if (await roleManager.FindByNameAsync(roleUser) == null)
                    {
                        await roleManager.CreateAsync(new IdentityRole(roleUser));

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

                    IdentityResult result = await userManager.CreateAsync(new_user, user.Password);

                    if (result.Succeeded)
                    {
                        if (user.IsSuperUser)
                        {
                            await userManager.AddToRoleAsync(new_user, roleSuperUser);
                        }
                        else
                        {
                            await userManager.AddToRoleAsync(new_user, roleUser);
                        }
                    }
                    return result.Succeeded;
                }
            }
            return _result;
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

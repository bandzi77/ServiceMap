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
        private UserManager<AppUser> userManager;
        private RoleManager<IdentityRole> roleManager;
        private IConfiguration _configuration;

        public UsersController(UserManager<AppUser> userMgr, RoleManager<IdentityRole> roleMgr, IConfiguration configuration)
        {
            userManager = userMgr;
            roleManager = roleMgr;
            _configuration = configuration;
        }


        // GET: api/values
        [HttpGet]
        public IActionResult Get(string email, bool showLockedOnly)
        {
            IQueryable<AppUser> _users = null;

            var roleId = roleManager.Roles.Where(x => x.NormalizedName == _configuration["Data:Roles:Superuser"].ToUpper()).Select(x=>x.Id).Single();

            if (!String.IsNullOrWhiteSpace(email))
            { _users = userManager.Users.Where(x => x.NormalizedEmail.StartsWith(email.ToUpper())); }
            else { _users = userManager.Users; }
            var _result = _users.Select(x => new User()
            {
                _id = x.Id,
                Email = x.Email,
                LimitOfRequestsPerDay = x.LimitOfRequestsPerDay,
                NumberOfRequestsPerDay = x.NumberOfRequestsPerDay,
                IsSuperUser = x.Roles.Any(y => y.RoleId == roleId),
                IsLocked = x.LockoutEnd > DateTime.Now && x.LockoutEnabled
            }).ToList();

            //for (int i = 0; i < 10; i++)
            //{
            //    _result.AddRange(_result);
            //}
          
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
        public async void Post([FromBody] User user)
        {
            if (ModelState.IsValid && user._id=="0")
            {
                string roleSuperUser = _configuration["Data:Roles:Superuser"];
                string roleUser = _configuration["Data:Roles:User"];

                if (await userManager.FindByEmailAsync(user.Email) == null)
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
                        UserName = user.Email,
                        Email = user.Email,
                        AccessFailedCount = 5,
                        LockoutEnd= user.IsLocked ? DateTimeOffset.MaxValue : (DateTimeOffset?)null ,
                        LimitOfRequestsPerDay =user.LimitOfRequestsPerDay,
                        NumberOfRequestsPerDay= user.NumberOfRequestsPerDay
                    };

                    IdentityResult result = await userManager.CreateAsync(new_user, user.Password);

                    if (result.Succeeded)
                    {
                        if (user.IsSuperUser)
                        {
                            await userManager.AddToRoleAsync(new_user, roleSuperUser);
                        }
                        else
                        { await userManager.AddToRoleAsync(new_user, roleUser); }
                    }
                }
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] User value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

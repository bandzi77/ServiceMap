using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using ServiceMap.Models.apiModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace ServiceMap.Common
{
    public class IdentityUserService : IUserService
    {
        public async Task<AppUser> GetUser(IHttpContextAccessor httpContext, UserManager<AppUser> userMgr)
        {
            if (httpContext == null)
                return null;
            var user = await userMgr.GetUserAsync(httpContext.HttpContext.User);
            return user;
        }
    }
}

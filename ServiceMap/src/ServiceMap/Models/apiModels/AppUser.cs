using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceMap.Models.apiModels
{
    public class AppUser: IdentityUser
    {
      public  int? NumberOfRequestsPerMonth { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServiceMap.Models.apiModels;
using ServiceMap.Models.Service_Tnt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using System.Data;
using ServiceMap.Sql;
using ServiceMap.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ServiceMap.Controllers.apiControllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class ServicesTntController : Controller
    {
        private IDepotRepository depotContext;
        private IServiceTntRepository serviceTnContext;
        private IConfiguration configuration;
        private IUserService userService;
        private UserManager<AppUser> userManager;

        public ServicesTntController(UserManager<AppUser> usrMgr, IServiceTntRepository serviceTntRepository, IConfiguration config, IUserService usrService, IDepotRepository depotRepository)
        {
            depotContext = depotRepository;
            serviceTnContext = serviceTntRepository;
            configuration = config;
            userService = usrService;
            userManager = usrMgr;
        }

        [HttpGet("GetServices")]
        public async Task<IActionResult> GetServices([FromQuery] ServiceFilter filter, PageInfo page)
        {
            List<ServiceTnt> res = new List<ServiceTnt>();
            var currentUser = await userService.GetUser(User);

            // Jeśli nie jest administratorem to zwieksza ilość zapytań w ciągu dnia o jeden
            if (!User.IsInRole(configuration["Data:Roles:Superuser"]))
            {
                if ((currentUser.NumberOfRequestsPerDay??0) >= currentUser.LimitOfRequestsPerDay)
                {
                    return Ok(new
                    {
                        serviceTnt = res,
                        paging = new { totalCount = 0, pageSize = page.PageSize },
                        requestsPerDay= new { limitOfRequestsPerDay = currentUser.LimitOfRequestsPerDay, numberOfRequestsPerDay = currentUser.NumberOfRequestsPerDay },
                        result = new { success = false, message = ConstsData.ExceededNumberOfRequestsPerDay }
                    });
                }
                currentUser.NumberOfRequestsPerDay = currentUser.NumberOfRequestsPerDay == null ? 1 : currentUser.NumberOfRequestsPerDay + 1;
                await userManager.UpdateAsync(currentUser);
            }

            res = serviceTnContext.ServicesTnt.FromSql(SqlQuery.sGetServicesTnt, SqlBuilder.GetServicesTnt(filter, page)).ToList();

            var result = new
            {
                serviceTnt = res,
                paging = new { totalCount = res.Select(x => x.TotalCount).FirstOrDefault(), pageSize = page.PageSize },
                requestsPerDay = new { limitOfRequestsPerDay = currentUser.LimitOfRequestsPerDay, numberOfRequestsPerDay = currentUser.NumberOfRequestsPerDay },
                result = new { success = true, message = "" }
            };

            return Ok(result);
        }


        [HttpGet("GetDepotDetails")]
        public IActionResult GetDepotDetails(string depotCode)
        {
            var depotDetails = depotContext.DepotDetails.Where(x => x.DepotCode == depotCode).ToList();
            var result = new { depotDetails };
            return Ok(result);
        }
    }
}

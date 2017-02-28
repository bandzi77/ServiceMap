using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServiceMap.Models.apiModels;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ServiceMap.Controllers.apiControllers
{
    [Route("api/[controller]")]
    public class ServicesTntController : Controller
    {
        //// GET: api/values
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/values/5
        [HttpGet("GetServices")]
        public IActionResult GetServices(string postCode, string cityName, Int16? currentPage)
        {
            var paging = new { totalCount = 3, pageSize = 3 };
            //x => x.productId >= (currentPage ?? 1)

            var serviceTnt = getMockData().ToList();

            for (int i = 0; i < 3; i++)
            {
                serviceTnt.AddRange(serviceTnt);
            }

            var result = new { serviceTnt = serviceTnt, paging = paging };
            return Ok(result);

        }

        [HttpGet("GetDepot")]
        public IActionResult GetDepot(string depotCode)
        {
            var paging = new { totalCount = 3, pageSize = 3 };
            //x => x.productId >= (currentPage ?? 1)

            var serviceTnt = getMockData().ToList();

            for (int i = 0; i < 3; i++)
            {
                serviceTnt.AddRange(serviceTnt);
            }

            var result = new { serviceTnt = serviceTnt, paging = paging };
            return Ok(result);

        }


        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}



        private List<ServiceTnt> getMockData()
        {
            var result = new List<ServiceTnt>()
            {
                new ServiceTnt()
                {
                     DepotCode1a = "GDN",
                     Town =  "ABISYNIA",
                     FromPostcode = "83-440",
                     ToPostcode = "83-440",
                     Sobota = false,
                     EX9 = false,
                     EX10 = false,
                     EX12 =false,
                     Priority = new TimeSpan(13,0,0),
                     WieczorneDostarczenie = false,
                     StandardDeliveryOd = new TimeSpan(13,0,0),
                     StandardDeliveryDo =  new TimeSpan(16,0,0),
                     PickUpDomesticZgl =   new TimeSpan(13,0,0),
                     DateTimePickUpEksportSmZgl =  new TimeSpan(12,0,0),
                     SamochodZwindaDostepnyWstandardzie = false,
                     DiplomatNextDay =   new TimeSpan(12,0,0),
                     SerwisPodmiejski = false,
                     PickUpDomesticCzas = "02.maj",
                     PickUpEksportSmCzas = "2",
                     SerwisMiejski = null
                },

                new ServiceTnt()
                {
                     DepotCode1a = "GDN",
                     Town =  "Gdańsk",
                     FromPostcode = "83-440",
                     ToPostcode = "83-440",
                     Sobota = false,
                     EX9 = false,
                     EX10 = false,
                     EX12 =false,
                     Priority = new TimeSpan(13,0,0),
                     WieczorneDostarczenie = false,
                     StandardDeliveryOd = new TimeSpan(13,0,0),
                     StandardDeliveryDo =  new TimeSpan(16,0,0),
                     PickUpDomesticZgl =   new TimeSpan(13,0,0),
                     DateTimePickUpEksportSmZgl =  new TimeSpan(12,0,0),
                     SamochodZwindaDostepnyWstandardzie = false,
                     DiplomatNextDay =   new TimeSpan(12,0,0),
                     SerwisPodmiejski = false,
                     PickUpDomesticCzas = "02.maj",
                     PickUpEksportSmCzas = "2",
                     SerwisMiejski = null
                },
                new ServiceTnt()
                {
                     DepotCode1a = "KRA",
                     Town =  "Kraków",
                     FromPostcode = "83-440",
                     ToPostcode = "83-440",
                     Sobota = true,
                     EX9 = false,
                     EX10 = false,
                     EX12 =true,
                     Priority = new TimeSpan(13,0,0),
                     WieczorneDostarczenie = false,
                     StandardDeliveryOd = new TimeSpan(13,0,0),
                     StandardDeliveryDo =  new TimeSpan(16,0,0),
                     PickUpDomesticZgl =   new TimeSpan(13,0,0),
                     DateTimePickUpEksportSmZgl =  new TimeSpan(12,0,0),
                     SamochodZwindaDostepnyWstandardzie = false,
                     DiplomatNextDay =   new TimeSpan(12,0,0),
                     SerwisPodmiejski = false,
                     PickUpDomesticCzas = "02.maj",
                     PickUpEksportSmCzas = "2",
                     SerwisMiejski = null
                },
                 new ServiceTnt()
                {
                     DepotCode1a = "WAW",
                     Town =  "WARSZAWA",
                     FromPostcode = "83-440",
                     ToPostcode = "83-440",
                     Sobota = false,
                     EX9 = false,
                     EX10 = false,
                     EX12 =false,
                     Priority = new TimeSpan(13,0,0),
                     WieczorneDostarczenie = false,
                     StandardDeliveryOd = new TimeSpan(13,0,0),
                     StandardDeliveryDo =  new TimeSpan(16,0,0),
                     PickUpDomesticZgl =   new TimeSpan(13,0,0),
                     DateTimePickUpEksportSmZgl =  new TimeSpan(12,0,0),
                     SamochodZwindaDostepnyWstandardzie = false,
                     DiplomatNextDay =   new TimeSpan(12,0,0),
                     SerwisPodmiejski = false,
                     PickUpDomesticCzas = "02.maj",
                     PickUpEksportSmCzas = "2",
                     SerwisMiejski = null
                }
            };
            return result;
        }

    }
}

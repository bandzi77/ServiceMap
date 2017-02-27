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
        [HttpGet]
        public IActionResult Get(string postCode, string cityName, Int16? currentPage)
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
                     Depot_code_1a = "GDN",
                     Town =  "ABISYNIA",
                     From_postcode = "83-440",
                     To_postcode = "83-440",
                     Sobota = false,
                     EX9 = false,
                     EX10 = false,
                     EX12 =false,
                     Priority = new TimeSpan(13,0,0),
                     Wieczorne_dostarczenie = false,
                     Standard_delivery_od = new TimeSpan(13,0,0),
                     Standard_delivery_do =  new TimeSpan(16,0,0),
                     Pick_up_domestic_zgl =   new TimeSpan(13,0,0),
                     Date_time_pick_up_eksport_sm_zgl =  new TimeSpan(12,0,0),
                     Samochod_z_winda_dostepny_w_standardzie = false,
                     Diplomat_next_day =   new TimeSpan(12,0,0),
                     Serwis_podmiejski = false,
                     Pick_up_domestic_czas = "02.maj",
                     Pick_up_eksport_sm_czas = "2",
                     Serwis_miejski = null
                },

                  new ServiceTnt()
                {
                   Depot_code_1a = "QLU",
                     Town =  "ABRAMOW",
                     From_postcode = "21-143",
                     To_postcode = "21-143",
                     Sobota = false,
                     EX9 = false,
                     EX10 = false,
                     EX12 =false,
                     Priority = new TimeSpan(13,0,0),
                     Wieczorne_dostarczenie = false,
                     Standard_delivery_od = new TimeSpan(13,0,0),
                     Standard_delivery_do =  new TimeSpan(16,0,0),
                     Pick_up_domestic_zgl =   new TimeSpan(13,0,0),
                     Date_time_pick_up_eksport_sm_zgl =  new TimeSpan(12,0,0),
                     Samochod_z_winda_dostepny_w_standardzie = false,
                     Diplomat_next_day =   new TimeSpan(12,0,0),
                     Serwis_podmiejski = false,
                     Pick_up_domestic_czas = "02.maj",
                     Pick_up_eksport_sm_czas = "2",
                     Serwis_miejski = null
                },
                    new ServiceTnt()
                {
                     Depot_code_1a = "QKI",
                     Town =  "ADAMEK",
                     From_postcode = "26-220",
                     To_postcode = "26-220",
                     Sobota = true,
                     EX9 = false,
                     EX10 = false,
                     EX12 =false,
                     Priority = new TimeSpan(13,0,0),
                     Wieczorne_dostarczenie = false,
                     Standard_delivery_od = new TimeSpan(13,0,0),
                     Standard_delivery_do =  new TimeSpan(16,0,0),
                     Pick_up_domestic_zgl =   new TimeSpan(13,0,0),
                     Date_time_pick_up_eksport_sm_zgl =  new TimeSpan(12,0,0),
                     Samochod_z_winda_dostepny_w_standardzie = false,
                     Diplomat_next_day =   new TimeSpan(12,0,0),
                     Serwis_podmiejski = false,
                     Pick_up_domestic_czas = "02.maj",
                     Pick_up_eksport_sm_czas = "2",
                     Serwis_miejski = null }
                    ,
                    new ServiceTnt()
                {
                     Depot_code_1a = "KRK",
                     Town =  "POZNACHOWICE DOLNE",
                     From_postcode = "32-412",
                     To_postcode = "32-412",
                     Sobota = false,
                     EX9 = true,
                     EX10 = true,
                     EX12 =false,
                     Priority = new TimeSpan(13,0,0),
                     Wieczorne_dostarczenie = false,
                     Standard_delivery_od = new TimeSpan(13,0,0),
                     Standard_delivery_do =  new TimeSpan(16,0,0),
                     Pick_up_domestic_zgl =   new TimeSpan(13,0,0),
                     Date_time_pick_up_eksport_sm_zgl =  new TimeSpan(12,0,0),
                     Samochod_z_winda_dostepny_w_standardzie = false,
                     Diplomat_next_day =   new TimeSpan(12,0,0),
                     Serwis_podmiejski = false,
                     Pick_up_domestic_czas = "02.maj",
                     Pick_up_eksport_sm_czas = "2",
                     Serwis_miejski = null         }
            };
            return result;
        }

    }
}

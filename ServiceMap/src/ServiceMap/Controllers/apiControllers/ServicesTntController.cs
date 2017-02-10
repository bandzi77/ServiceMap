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
            var paging = new { totalCount = 3, pageSize = 1 };
            var serviceTnt = getMockData().Where(x=>x.productId==(currentPage??1)).ToList();

            var result = new { serviceTnt = serviceTnt , paging = paging };
            return Ok(result );

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
                    productId=1,
                    productName="Leaf Rake1",
                    productCode="42-350",
                    releaseDate = "2017-05-10",
                    price =10,
                    description ="Leaf rake with 48-inch wooden handle.",
                    starRating = 5,
                    imageUrl = "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
                },

                  new ServiceTnt()
                {
                    productId=2,
                    productName="Leaf Rake2",
                    productCode="42-350",
                    releaseDate = "2017-05-10",
                    price =10,
                    description ="Leaf rake with 48-inch wooden handle.",
                    starRating = 5,
                    imageUrl = "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
                },
                    new ServiceTnt()
                {
                    productId=3,
                    productName="Leaf Rake3",
                    productCode="42-350",
                    releaseDate = "2017-05-10",
                    price =10,
                    description ="Leaf rake with 48-inch wooden handle.",
                    starRating = 5,
                    imageUrl = "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
                }
            };
            return result;
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceMap.Models.ServiceTnt
{
    public class ServiceFilter
    {
        public string postCode { get; set; }
        public string cityName { get; set; }
        public int? currentPage { get; set; }

    }
}

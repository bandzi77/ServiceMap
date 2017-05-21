using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceMap.Models.Service_Tnt
{
    public interface IServiceTntRepository
    {
        IEnumerable<ServiceTnt> ServicesTnt { get; }
    }
}
